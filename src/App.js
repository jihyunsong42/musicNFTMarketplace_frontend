import './App.css';
import MenuBar from './components/menuBar/menuBar';
import Banner from './components/banner/banner';
import Player from './components/player/player';
import MyMusicList from './components/myMusicList/myMusicList';
import MintNFT from './components/mintNFT/mintNFT';
import Market from './components/market/market';
import { Route, Link } from 'react-router-dom';
import axios from "axios";
import WalletNotConnected from './components/walletNotConnected/walletNotConnected';
import { create } from "ipfs-http-client";
import { useEffect } from 'react';
import { ethers } from 'ethers';

function App() {

  return (
    <div>
      <div className="backGround">
        <div className="menuBar">
          <MenuBar link={Link} />
        </div>
        {/* <Video /> */}
        <div className="banner">
          <Route exact path="/" component={Banner} />
          <Route exact path="/myMusicList" component={MyMusicList} />
          <Route exact path="/mintNFT" component={MintNFT} />
          <Route exact path="/market" component={Market} />
        </div>
        <div className="player">
          <Player />
        </div>
      </div>
    </div>
  );
}


export default App;
