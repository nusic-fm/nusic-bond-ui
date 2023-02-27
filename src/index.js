import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

import { getLibrary } from "./utils/web3React";
import { Web3ReactProvider } from "@web3-react/core";

import { RecoilRoot } from "recoil";

WebFont.load({
  google: {
    families: ["Nunito", "Space Mono"],
  },
});

let theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5B21D4",
    },
    success: {
      main: "#4AAB1A",
    },
    info: {
      main: "#A794FF",
    },
  },
  typography: {
    allVariants: {
      color: "#ffffff",
    },
    fontFamily: `"Nunito", sans-serif`,
  },
});
theme = responsiveFontSizes(theme);

//  Wallet configs

const mainnet = {
  name: "mainnet",
  chainID: "columbus-4",
  lcd: "https://lcd.terra.dev",
};

const testnet = {
  name: "testnet",
  chainID: "bombay-11",
  lcd: "https://bombay-lcd.terra.dev",
};

const walletConnectChainIds = {
  0: testnet,
  1: mainnet,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Web3ReactProvider getLibrary={getLibrary}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </Web3ReactProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
