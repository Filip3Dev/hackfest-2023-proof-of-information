import * as nearAPI from "near-api-js";

export async function getNearBalance(accountId) {
  const { keyStores } = nearAPI;
  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

  const { connect } = nearAPI;

  const connectionConfig = {
    networkId: "testnet",
    keyStore: myKeyStore, // first create a key store
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  const nearConnection = await connect(connectionConfig);

  const account = await nearConnection.account(accountId);
  const balance = await account.getAccountBalance();

  return balance;
}
