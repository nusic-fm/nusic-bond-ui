import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

WebFont.load({
  google: {
    families: ["Nunito"],
  },
});

let theme = createTheme({
  palette: {
    primary: {
      main: "#5B21D4",
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
        {/* <RecoilRoot> */}
        <App />
        {/* </RecoilRoot> */}
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
