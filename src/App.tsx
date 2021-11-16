import "./App.css";
import { Main } from "./routes";
import { Box, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Header from "./container/Header";
import Home from "./pages/Intro";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function App() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box>
      <Header />
      <Toolbar />
      <Main />
    </Box>
  );
}

export default App;
