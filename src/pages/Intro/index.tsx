import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import Organization from "../../components/Organization";

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: "calc(100vh - 65px)",
    backgroundImage: "url(nusic_dj.JPG)",
    backgroundSize: "cover",
    backgroundPosition: "center center",

    boxShadow: "inset 2000px 0 0 0 rgba(0, 0, 0, 0.5)",
    borderColor: "rgb(23,23,47)",
  },
  rowTwo: {
    fontSize: "24px",
  },
}));

const Intro = () => {
  const classes = useStyles();
  const history = useHistory();

  const onGettingStarted = () => {
    history.push("/home");
  };

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Typography variant="h2">NFT NOTES</Typography>
      </Box>
      <Box mb={3}>
        <Typography variant="h6">
          Get your future streaming income now!
        </Typography>
      </Box>
      <Button color="primary" variant="contained" onClick={onGettingStarted}>
        Get Started
      </Button>
      <Organization />
    </Box>
  );
};

export default Intro;
