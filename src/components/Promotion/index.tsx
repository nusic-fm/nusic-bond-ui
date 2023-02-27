import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Props = { goToNextPage: () => void };

const Promotion = ({ goToNextPage }: Props) => {
  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={8}>
            <Typography align="center" variant="h6">
              Select the platforms you want to promote this track on
            </Typography>
            <Stack
              flexDirection={"row"}
              gap={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Card sx={{ width: "100%" }}>
                <CardHeader title="Tiktok"></CardHeader>
                <CardContent></CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button variant="contained">Select</Button>
                </CardActions>
              </Card>
              <Card sx={{ width: "100%" }}>
                <CardHeader title="Spotify"></CardHeader>
                <CardContent></CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button variant="contained">Select</Button>
                </CardActions>
              </Card>
            </Stack>
            <Box my={2}>
              <TextField
                multiline
                label="Add additional infos"
                rows={4}
                fullWidth
              ></TextField>
            </Box>
            <Box>
              <TextField
                label="Set Promotion Budget"
                helperText="can not be more than 1/3 of the collateral"
              ></TextField>
            </Box>
            <Box mt={4}>
              <Button variant="outlined" color="info" onClick={goToNextPage}>
                Continue to Issue Bond
              </Button>
            </Box>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Promotion;
