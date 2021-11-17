import { ethers } from "ethers";
// import getNodeUrl from "./getRpcUrl";
// import { InjectedConnector } from '@web3-react/injected-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const POLLING_INTERVAL = 12000;
// const rpcUrl = getNodeUrl();
// const chainId = parseInt(process.env.REACT_APP_MATIC_CHAIN_ID as string, 10);

// const injected = new InjectedConnector({ supportedChainIds: [chainId] });

// const walletconnect = new WalletConnectConnector({
//   rpc: { [chainId]: rpcUrl },
//   // bridge: "https://pancakeswap.bridge.walletconnect.org/",
//   qrcode: true,
//   pollingInterval: POLLING_INTERVAL,
// });

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
