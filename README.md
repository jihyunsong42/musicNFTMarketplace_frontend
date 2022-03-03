# Music NFT Marketplace Project
A Music NFT(Non-Fungible Token) Marketplace where customers can mint, buy and sell their music NFTs.<br>This project was conducted with junior UI/UX Designer during Ethereum Hackathon 2021. I took part of front-end and back-end logic on this project and also contributed to the smart contract.<br>
🔗 https://musicnft.azurewebsites.net<br>

## How It Works

This DApp(Decentralised Application) is a Music NFT(Non-Fungible Token) Marketplace where customers can mint, buy and sell their music NFTs.<br>In this DApp, user can upload their soundtrack on IPFS(Inter-Planetery File System). Once the soundtrack information is uploaded, it will return a CID(hash value) which every NFT should contain. In this project, I followed Multi-Token Standard(ERC-1155) for creating NFT Tokens so creators can determine how many NFTs they want to mint.<br>Once NFTs are minted, The creator can also upload their music NFTs on tradeblock. Anyone in blockchain network(This app is running on polygon testnet.) can trade this dApp's user's NFTs via smart contract.

## Prerequisites
Metamask extention MUST be installed on your web browser. You also need to set up your network to Polygon testnet and prepare some test MATIC for your transaction gas fee.

## Basic Usage
### How to mint your NFT
![musicNFT](https://user-images.githubusercontent.com/43053791/156318632-ddc3b1c3-956d-4d44-90a0-6d48d0873ae5.PNG)
#### fig. 1) NFT Marketplace Page<br>
#1 from the main page(fig. 1), click "Mint NFT" tab at the top menu to mint your own NFT.<br>

![mintNFT](https://user-images.githubusercontent.com/43053791/156320508-29dabcd1-42ea-494e-a1c4-c6de25649fbc.PNG)

#### fig. 2) NFT Minting Page<br>
#2 After this page(fig. 2) shows up, fill out your song information(soundtrack, cover, title etc.) and click "Mint NFT" button.<br><br>
#3 The client will send three requests to the backend server. The first and second request are sending soundtrack source file and album cover image file to the back-end server. The last request will be executed after two requests are finished.<br><br>
#4 When back-end server receives requests, We need to upload these files to IPFS in order to mint NFT. There are two ways to upload data. The first way is running your own IPFS node and the second one is using pinning service. To avoid complicated implementation, We used pinning service Pinata API for this time. With Pinata API key, we can upload soundtrack and image file from back-end server to IPFS.<br><br>
#5 Once it is uploaded, Pinata API returns CID, which is crucial for creating NFT. This hash value indicates the address of data and it must be included in NFT Metadata.<br><br>
#6 After pinning, client-side app creates object for NFT metadata and put information. the metadata form includes CIDs of ipfs image and ipfs soundtrack.<br><br>
#7 Client app send the third request to the back-end server with metadata JSON file.<br><br>
#8 Back-end server upload this JSON file to IPFS and get CID. The server is going to response to the client with this CID to mint NFT.<br><br>
#9 Client app calls smart contract function which mints NFT by passing CID and amount.<br><br>
#10 After the transaction is made, you can check your NFT in "My ♬" tab! 🎉<br><br>

### How to sell NFT
![musicNFT_myMusic](https://user-images.githubusercontent.com/43053791/156320633-532c5431-18ee-4aee-ac3b-8bf2a874f680.PNG)

#### fig. 3) My ♬ Page<br>
#1 Click "My ♬" tab to see your NFT list.<br><br>
#2 Choose a NFT you like to sell from right list and click "Sell" button.<br><br>
#3 Click "Approve" button to approve your NFT to the smart contract. This allows smart contract to access your NFT. This process will happen only once so you don't need to do it again next time.<br><br>
#4 Set the price and amount you want to sell, and click "Add on Tradeblock" button.<br><br>
#5 Metamask will pop up and ask you to confirm your transaction. Press "Confirm" button.<br><br>
#6 Your NFT is now on tradeblock! It means your NFT is on smart contract. Go to "Market" tab and you will be able to see that your NFT is on the market.<br><br>


### How to buy NFT
![buyNFTs](https://user-images.githubusercontent.com/43053791/156320143-fd61ba45-8aa9-4990-a9ed-0d13ca419bed.PNG)

#### fig. 3) Market Page<br>
#1 Click "Market" tab to see opened NFT tradings.<br><br>
#2 Choose a NFT you like to buy from right list and click "Buy" button.<br><br>
#3 Before you purchase NFTs, you need to have BBB Token in your wallet. BBB token is ERC-20 Stardard token which is used to trade NFT in this NFT Marketplace.
#4 Click "Approve" button to approve your BBB Token to the smart contract. This allows smart contract to access your BBB token. This process only will happen only once so you don't need to do it again next time.<br><br>
#5 Set the amount you want to buy and click "Purchase" button.<br><br>
#6 You just purchased a NFT! Go to "My ♬" page and check your NFT!

## Languages / Frameworks used for this project
Javascript<br>
React<br>
Node.js / Express.js<br>
Solidity<br>
IPFS<br>
Pinata API<br>
Ether.js<br>

※ Currently client/server communication is not stable so minting NFT is not working. I am working on fixing this at the moment.<br>
You can also check back-end and smart contract codes here.<br>
https://github.com/jihyunsong42/musicNFTMarketplace_backend<br>
https://github.com/jihyunsong42/musicNFTMarketplace_contracts
