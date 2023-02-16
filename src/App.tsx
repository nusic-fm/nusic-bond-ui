import "./App.css";
import { Main } from "./routes";
// import useEagerConnect from "./hooks/useEagerConnect";

import Header from "./container/Header";
import { Box, Toolbar } from "@mui/material";

function App() {
  // useEagerConnect();

  return (
    <Box>
      <Header />
      <Toolbar />
      <Main />
    </Box>
  );
}

export default App;
