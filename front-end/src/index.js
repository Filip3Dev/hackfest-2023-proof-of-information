// React
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Wallet } from "../src/shared/NearWallet/near-wallet";

const connectionConfig = {
  networkId: "testnet",
  keyStore: null, // first create a key store
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

const wallet = new Wallet({
  createAccessKeyFor: null,
});

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  ReactDOM.render(
    <App isSignedIn={isSignedIn} wallet={wallet} />,
    document.getElementById("root")
  );
};
