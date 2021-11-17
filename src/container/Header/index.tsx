import { AppBar, Box, makeStyles, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Button, Chip, Tooltip, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "black",
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
}));

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
            display="inline-block"
            className={classes.titleText}
            onClick={() => {
              history.push("/");
            }}
          >
            NUSIC
          </Box>
        </Typography>
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
