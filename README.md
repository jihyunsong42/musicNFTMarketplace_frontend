# Music NFT Marketplace Project

link : https://musicnft.azurewebsites.net<br>

![musicNFT](https://user-images.githubusercontent.com/43053791/156318632-ddc3b1c3-956d-4d44-90a0-6d48d0873ae5.PNG)

This DApp(Decentralised Application) is Music NFT(Non-Fungible Token) Marketplace, where customers can mint, buy and sell their music NFTs.<br>In this DApp, user can upload their soundtrack on IPFS(Inter-Planetery File System). After the soundtrack is uploaded, it will return a CID(hash value) in which every NFT should contain. In this project, I used Multi-Token Standard(ERC-1155) so creators can determine how many NFTs they want to mint.<br>Once NFTs are minted, The creator can also upload their music NFTs on tradeblock. Anyone in this blockchain network(in my project, it is running on polygon testnet.) can trade this dApp's user's NFTs via smart contract.<br>This project was conducted with junior UI/UX Designer during Ethereum Hackathon. I took part of front-end and back-end logic on this project and also contributed to Smart Contract.

![mintNFT](https://user-images.githubusercontent.com/43053791/156320508-29dabcd1-42ea-494e-a1c4-c6de25649fbc.PNG)

#### fig. 1) NFT Minting Page<br><br>

![musicNFT_myMusic](https://user-images.githubusercontent.com/43053791/156320633-532c5431-18ee-4aee-ac3b-8bf2a874f680.PNG)

#### fig. 2) My NFT Music Page<br><br>

![buyNFTs](https://user-images.githubusercontent.com/43053791/156320143-fd61ba45-8aa9-4990-a9ed-0d13ca419bed.PNG)

#### fig. 3) NFT Purchasing Page<br><br>

#1 React.js is used to create the front-end app, and Node.js / Express.js for back-end.<br>
#3 For UI, Bootstrap 4 and Font Awesome 4 were used. HighCharts, Pandas were also used to display charts.<br>
#4 The main page shows KOSPI stock chart, and if you select other market tabs, the chart changes.<br>
#5 You can scale in/out stock charts by clicking time units.

※ Currently client/server communication is not stable so minting NFT is not working. I am working on this at the moment.<br>
You can also check back-end and smart contract code at : <br>
https://github.com/jihyunsong42/musicNFTMarketplace_backend<br>
https://github.com/jihyunsong42/musicNFTMarketplace_contracts
