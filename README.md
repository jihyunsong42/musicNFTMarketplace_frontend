# Music NFT Marketplace Project
A Music NFT(Non-Fungible Token) Marketplace where customers can mint, buy and sell their music NFTs.<br>This project was conducted with junior UI/UX Designer during Ethereum Hackathon 2021. I took part of front-end and back-end logic on this project and also contributed to the smart contract.
link : https://musicnft.azurewebsites.net<br>

## How It Works

This DApp(Decentralised Application) is a Music NFT(Non-Fungible Token) Marketplace where customers can mint, buy and sell their music NFTs.<br>In this DApp, user can upload their soundtrack on IPFS(Inter-Planetery File System). Once the soundtrack information is uploaded, it will return a CID(hash value) which every NFT should contain. In this project, I followed Multi-Token Standard(ERC-1155) for creating NFT Tokens so creators can determine how many NFTs they want to mint.<br>Once NFTs are minted, The creator can also upload their music NFTs on tradeblock. Anyone in blockchain network(This app is running on polygon testnet.) can trade this dApp's user's NFTs via smart contract.


## Basic Usage
# How to mint your NFT
![musicNFT](https://user-images.githubusercontent.com/43053791/156318632-ddc3b1c3-956d-4d44-90a0-6d48d0873ae5.PNG)
#### fig. 1) NFT Marketplace Page<br>
#1 <br>from the main page(fig. 1), click "Mint NFT" tab to mint your own NFT.<br>

![mintNFT](https://user-images.github<br>usercontent.com/43053791/156320508-29dabcd1-42ea-494e-a1c4-c6de25649fbc.PNG)
#### fig. 1) NFT Minting Page<br>
#2 After this page(fig. 2) shows up, fill out your song information(soundtrack to upload, cover, title etc.) and click "Mint NFT" button.<br><br>
#3 The client will send three requests to the backend server. The first and second request are sending soundtrack source file and album cover image file to the back-end server. The last request will be executed after two requests are finished.<br><br>
#4 When Back-End server receives requests, We need to upload these files to IPFS in order to mint NFT. There are two ways to upload data. The first way is running your own IPFS node and the second one is using pinning service. To avoid complicated implementation, We used pinning service Pinata API for this time. With Pinata API key, we can upload soundtrack and image file from back-end server to IPFS.<br><br>
#5 Once it is uploaded, Pinata API returns CID, which is crucial for creating NFT. This hash value indicates the address of data and it must be included in NFT Metadata.<br><br>
#6 After pinning, client-side app creates object for NFT metadata and put information. the metadata form includes CIDs of ipfs image and ipfs soundtrack.<br><br>
#7 Client app send the third request to the back-end server with metadata JSON file.<br><br>
#8 Back-end server upload this json file and get CID. This is going to be returned to the client to mint NFT.<br><br>
#9 Client app calls smart contract function which mints NFT by passing CID and amount.<br><br>
#10 Process will be finish soon and finally you can check your NFT in your Metamask wallet!<br><br>

![musicNFT_myMusic](https://user-images.githubusercontent.com/43053791/156320633-532c5431-18ee-4aee-ac3b-8bf2a874f680.PNG)
#### fig. 2) My NFT Music Page<br><br>

![buyNFTs](https://user-images.githubusercontent.com/43053791/156320143-fd61ba45-8aa9-4990-a9ed-0d13ca419bed.PNG)

#### fig. 3) NFT Purchasing Page<br><br>

React.js is used to implement the front-end, and Node.js / Express.js for back-end.<br>

#### prerequisites
Metamask MUST be installed on your browser. You also need to set up your network to Polygon testnet.



※ Currently client/server communication is not stable so minting NFT is not working. I am working on this at the moment.<br>
You can also check back-end and smart contract code at : <br>
https://github.com/jihyunsong42/musicNFTMarketplace_backend<br>
https://github.com/jihyunsong42/musicNFTMarketplace_contracts
