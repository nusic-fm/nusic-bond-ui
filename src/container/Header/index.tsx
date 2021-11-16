import { AppBar, Box, makeStyles, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@mui/material";

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
        <Button variant="contained" color="primary">
          Connect Wallet
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
