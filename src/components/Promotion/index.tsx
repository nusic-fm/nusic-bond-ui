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
                <CardContent>
                  <Stack flexDirection={"row"} justifyContent="center">
                    <img
                      src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1676977024390x429224891718625200%2FTikTok.png?w=96&h=96&auto=compress&dpr=2&fit=max"
                      width={80}
                    />
                  </Stack>
                </CardContent>
                <CardContent>
                  <Typography align="center" variant="h5">
                    Tiktok
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button variant="contained">Select</Button>
                </CardActions>
              </Card>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Stack flexDirection={"row"} justifyContent="center">
                    <img src="/spotify.png" width={80} />
                  </Stack>
                </CardContent>
                <CardContent>
                  <Typography align="center" variant="h5">
                    Tiktok
                  </Typography>
                </CardContent>
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
                Continue to Issue Notes
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
