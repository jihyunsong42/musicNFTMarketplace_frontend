import stylesMint from "./mintNFT.module.css";
import axios from "axios";
import { useRef, useState } from 'react';
import imageUpload from "../images/imageUpload.png";
import songUpload from "../images/uploadSong.png";
import { ethers } from 'ethers';
import MusicFactory from '../../abi/MusicFactory.json';
import addresses from '../../environment/ContractAddress.json';
import { create } from "ipfs-http-client"

function MintNFT() {
  const [Title, setTitle] = useState("");
  const [Artist, setArtist] = useState("");
  const [Genre, setGenre] = useState("");
  const [Description, setDescription] = useState("");
  const [ExternalURL, setExternalURL] = useState("");
  const [Amount, setAmount] = useState("");

  const [Image, setImage] = useState(imageUpload);
  const [ImageName, setImageName] = useState("Click to Upload");
  const [Song, setSong] = useState(null);
  const [SongName, setSongName] = useState("Upload Music");
  const [ButtonText, setButtonText] = useState("Mint NFT"); 

  const [isMintButtonClicked, setIsMintButtonClicked] = useState(false);

  const PutTitle = (e) => setTitle(e.target.value);
  const PutArtist = (e) => setArtist(e.target.value);
  const PutGenre = (e) => setGenre(e.target.value);
  const PutDescription = (e) => setDescription(e.target.value);
  const PutExternalURL = (e) => setExternalURL(e.target.value);
  const PutAmount = (e) => setAmount(e.target.value);

  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);

  const getGatewayAddress = (cid) => {
    var gatewayAddress = "https://ipfs.io/ipfs/" + cid
    return gatewayAddress;
}

  const ClickImageInput = () => {
    imageInputRef.current?.click();
  }

  const ClickMusicInput = () => {
    songInputRef.current?.click();
  }

  const UploadImage = (e) => {
    const type = e.target.files[0].type;
    if (!type.startsWith("image")) {
      window.alert("please choose correct data type")
    }
    else {
      setImageName(e.target.files[0].name);
      setImage(e.target.files[0]);
    }
  }

  const UploadMusic = (e) => {
    const type = e.target.files[0].type;
    if (!type.startsWith("audio")) {
      window.alert("please choose correct data type")
    }
    else {
      setSongName(e.target.files[0].name)
      setSong(e.target.files[0]);
    }
  }

  const SubmitForm = async (e) => {
    setIsMintButtonClicked(true);
    // e.preventDefault();
    window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    const signer = provider.getSigner();
    const creatorAddress = await signer.getAddress();

    if (network.chainId !== 4) {  
      alert("Please change your network to rinkeby testnet!");
      setIsMintButtonClicked(false);
    }
    else {
      if (!Title || !Artist || !Genre || !Description || !Amount || (Image === imageUpload) || !Song) {
        let message = "please fill out: ";
        if (!Title) message += "\nTitle";
        if (!Artist) message += ", Artist";
        if (!Genre) message += ", Genre";
        if (!Description) message += ", Description";
        if (!Amount) message += ", Amount";
        if (Image === imageUpload) message += ", Image";
        if (!Song) message += ", Song";
        window.alert(message);
        setIsMintButtonClicked(false);
      }
      else {
        try {
          setButtonText("Loading...")
          const JsonPosturl = "http://localhost:4000/pinJsonFileToIPFS";
          const ImagePostUrl = "http://localhost:4000/pinAlbumCoverToIPFS";
          const MusicPostUrl = "http://localhost:4000/pinMusicSourceToIPFS";
          const ipfs = create("http://localhost:5001");

          // using pinata API
          const musicFormData = new FormData();
          musicFormData.append("music", Song);
          const imageFormData = new FormData();
          imageFormData.append("image", Image);

          let ipfsImage;
          let ipfsMusic;

          await axios.all([
            axios.post(ImagePostUrl, imageFormData, {
              headers: {
                'Content-type': 'multipart/form-data'
              }
            }),
            axios.post(MusicPostUrl, musicFormData, {
              headers: {
                'Content-type': 'multipart/form-data'
              }
            })
          ]).then(axios.spread((resImage, resMusic) => {
            ipfsImage = "ipfs://" + resImage.data;
            ipfsMusic = "ipfs://" + resMusic.data;
          }));


          // console.log("1: uploading image on IPFS");
          // const ipfsImageHash = (await ipfs.add(Image)).path;
          // console.log("done! : " + ipfsImageHash);
          // console.log("2: uploading music on IPFS");
          // const ipfsMusicHash = (await ipfs.add(Song)).path;
          // console.log("done! : " + ipfsMusicHash);
          console.log("3: getting Token ID");
          const result = await fetch('https://api-staging.rarible.com/protocol/v0.1/ethereum/nft/collections/0x1AF7A7555263F275433c6Bb0b8FdCD231F89B1D7/generate_token_id?minter=' + creatorAddress);
          const tokenId = (await result.json()).tokenId;
          console.log("done! : " + tokenId);
          console.log("4: creating metadata");
          const data = {
            "name": Title,
            "artist": Artist,
            "genre": Genre,
            "description": Description,
            "image": ipfsImage,
            "animation_url": ipfsMusic,
            "external_url": "https://rinkeby.rarible.com/0x1AF7A7555263F275433c6Bb0b8FdCD231F89B1D7:" + tokenId
          };
          const dataStr = JSON.stringify(data);
          console.log("done! : " + dataStr);
          
          console.log("5: uploading metadata on IPFS");
          let metadataHash = (await axios.post(JsonPosturl, data, {
            headers: { "Content-Type": "application/json" }
          })).data;
          console.log("done! : " + metadataHash);
          // const metadataHash = (await ipfs.add(dataStr)).path;
          // console.log("done! : " + metadataHash);
          // console.log(metadataHash);
          const dataStructure = {
            "types": {
              "EIP712Domain": [
                {
                  type: "string",
                  name: "name",
                },
                {
                  type: "string",
                  name: "version",
                },
                {
                  type: "uint256",
                  name: "chainId",
                },
                {
                  type: "address",
                  name: "verifyingContract",
                }
              ],
              "Mint1155": [
                { name: "tokenId", type: "uint256" },
                { name: 'supply', type: 'uint256' },
                { name: "tokenURI", type: "string" },
                { name: "creators", type: "Part[]" },
                { name: "royalties", type: "Part[]" }
              ],
              "Part": [
                { name: "account", type: "address" },
                { name: "value", type: "uint96" }
              ]
            },
            "domain": {
              name: "Mint1155",
              version: "1",
              chainId: 4,
              verifyingContract: "0x1AF7A7555263F275433c6Bb0b8FdCD231F89B1D7"
            },
            "primaryType": "Mint1155",
            "message": {
              "@type": "ERC1155",
              "contract": "0x1AF7A7555263F275433c6Bb0b8FdCD231F89B1D7",
              "tokenId": tokenId,
              "tokenURI": "/ipfs/" + metadataHash,
              "uri": "/ipfs/" + metadataHash,
              "supply": Amount,
              "creators": [
                {
                  account: creatorAddress,
                  value: "10000"
                }
              ],
              "royalties": [
                {
                  account: creatorAddress,
                  value: "2000"
                }
              ],
            }
          };
          console.log("6: signing on blockchain");
          const msgData = JSON.stringify(dataStructure);
          const web3provider = new ethers.providers.Web3Provider(window.ethereum);
          const signature = await web3provider.send("eth_signTypedData_v4", [creatorAddress, msgData]);
          console.log("done! : " + signature);

          const sig0 = signature.substring(2);
          const r = "0x" + sig0.substring(0, 64);
          const s = "0x" + sig0.substring(64, 128);
          const v = parseInt(sig0.substring(128, 130), 16);
          const finalResult = {
            dataStructure,
            signature,
            v,
            r,
            s,
          };
          
          const sign = finalResult.signature.toString();
          console.log("7: creating a request body");
          const body = {
            "@type": "ERC1155",
            "contract": "0x1AF7A7555263F275433c6Bb0b8FdCD231F89B1D7",
            "tokenId": tokenId,
            "uri": "/ipfs/" + metadataHash,
            "supply": Amount,
            "creators": [
              {
                account: creatorAddress,
                value: "10000"
              }
            ],
            "royalties": [
              {
                account: creatorAddress,
                value: "2000"
              }
            ],
            "signatures": [sign]
          };

          const bodyToStr = JSON.stringify(body);
          console.log("done! : " + bodyToStr);
          console.log("8: sending an api request");
          const postResult = await axios.post("https://ethereum-api-staging.rarible.org/v0.1/nft/mints", bodyToStr, {
            headers: { "Content-Type": `application/json`}
              });
          console.log("done! : " + postResult.data);
          window.alert("your NFT has been minted. check your music box!");
          window.location.reload();
        }
        catch (err) {
          window.alert(err + "\nPlease try again.");
          window.location.reload();
        }
        
      }
    }
  }

  return (
    <article>
      <section>
        <div>
          <div className={stylesMint.imageUpload} onClick={ClickImageInput}>
            <div className={stylesMint.adjust1}>
              <img src={imageUpload} alt={imageUpload}></img>
              <div>{ImageName}</div>
            </div>
            <input type="file" ref={imageInputRef} style={{ display: "none" }} onChange={UploadImage} />
          </div>
          <div className={stylesMint.musicUpload} onClick={ClickMusicInput}>
            <div className={stylesMint.adjust2}>
              <img src={songUpload} alt={songUpload}></img>
              <div>{SongName}</div>
            </div>
            <input type="file" ref={songInputRef} style={{ display: "none" }} onChange={UploadMusic} />
          </div>
        </div>
        <div className={stylesMint.rightRow}>
          <div className={stylesMint.mintMetadata}>
            <form>
              <label className={stylesMint.label}>
                Title
              </label>
              <input type="text" onChange={PutTitle}>
              </input>
              <label className={stylesMint.label}>
                Artist
              </label>
              <input type="text" onChange={PutArtist}>
              </input>
              <label className={stylesMint.label}>
                Genre
              </label>
              <input type="text" onChange={PutGenre}>
              </input>
              <label className={stylesMint.label}>
                Description
              </label>
              {/* <input type="text" className={stylesMint.description} onChange={PutDescription}> */}
              <textarea className={stylesMint.description} onChange={PutDescription}></textarea>
              {/* </input> */}
              <label className="label">
                External URL
              </label>
              <input type="text" onChange={PutExternalURL}>
              </input>
              <label className={stylesMint.label}>
                NFT Amount
              </label>
              <input type="number" onChange={PutAmount}>
              </input>
              </form>
          </div>
          <button className={stylesMint.mintButton} disabled={isMintButtonClicked} onClick={SubmitForm}>
            Mint NFT
          {/* <WaitTx /> */}
          </button>
        </div>
      </section>
    </article>
  );
}

export default MintNFT;