import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#17172F",
    bottom: 0,
    height: "70px",
    width: "100%",
  },
});
const Footer = (props: any) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="end"
      p={2}
      position={props.position || "absolute"}
    >
      {props.children}
    </Box>
  );
};

export default Footer;
