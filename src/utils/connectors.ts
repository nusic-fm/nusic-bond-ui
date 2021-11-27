import { InjectedConnector } from "@web3-react/injected-connector";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    // 1, // Mainet
    // 3, // Ropsten
    4, // Rinkeby
    // 5, // Goerli
    // 42, // Kovan
    // 137, // Polygon
    // parseInt(process.env.REACT_APP_MATIC_CHAIN_ID as string),
  ],
});
