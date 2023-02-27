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
          <Box gap={0.5} display="flex" alignItems="center">
            <img
              src="/nusic-white.png"
              alt="nusic"
              height="40px"
              className={classes.titleText}
              onClick={() => {
                history.push("/");
              }}
            />
            <Box display={"flex"} flexDirection="column">
              <Typography
                fontWeight={900}
                color="rgb(207, 207, 207)"
                fontFamily={"Space Mono"}
              >
                NFT
              </Typography>
              <Typography
                fontWeight={900}
                color="rgb(207, 207, 207)"
                fontFamily={"Space Mono"}
              >
                NOTES
              </Typography>
            </Box>
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
          Dashboard
        </Button>
        {account ? (
          <Tooltip title={account}>
            <Chip
              clickable
              label={`${account.slice(0, 6)}...${account.slice(
                account.length - 4
              )}`}
              style={{ marginLeft: "auto" }}
              size="small"
            />
          </Tooltip>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={connect}
            size="small"
          >
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
