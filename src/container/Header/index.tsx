import { useHistory } from "react-router-dom";
import {
  Button,
  Chip,
  Tooltip,
  Typography,
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useWeb3React } from "@web3-react/core";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#17172F",
  },
  title: {
    flexGrow: 1,
  },
  titleText: {
    cursor: "pointer",
  },
  icon: {
    margin: "0 10px",
    cursor: "pointer",
  },
});

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const { login } = useAuth();
  const { account } = useWeb3React();

  const connect = async () => {
    login();
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Box
            display="flex"
            alignItems="center"
            className={classes.titleText}
            onClick={() => {
              history.push("/");
            }}
          >
            <img src="/nu-logo-white.png" alt="nusic" height="25px" />
            NUSIC
          </Box>
        </Typography>
        <Button
          size="small"
          variant="outlined"
          color="success"
          onClick={() => {
            history.push("/dashboard");
          }}
          style={{ marginRight: "12px" }}
        >
          My Dashboard
        </Button>
        {account ? (
          <Tooltip title={account}>
            <Chip
              clickable
              label={`${account.slice(0, 6)}...${account.slice(
                account.length - 4
              )}`}
              style={{ marginLeft: "auto" }}
            />
          </Tooltip>
        ) : (
          <Button variant="contained" color="primary" onClick={connect}>
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
