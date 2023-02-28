import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { InfluencerDetails } from "../../hooks/useManager";
import { marketingState } from "../../state";

type Props = { goToNextPage: () => void };

const Promotion = ({ goToNextPage }: Props) => {
  const [influencersObj, setInfluencersObj] = useState<InfluencerDetails>({
    influencerOne: "0x0000000000000000000000000000000000000000",
    influencerOneShare: "0",
    influencerTwo: "0x0000000000000000000000000000000000000000",
    influencerTwoShare: "0",
  });

  const setMarketingState = useSetRecoilState(marketingState);

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
              <Card
                sx={{
                  width: "100%",
                  border:
                    influencersObj.influencerOne !==
                    "0x0000000000000000000000000000000000000000"
                      ? "1px solid white"
                      : "",
                }}
              >
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
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInfluencersObj({
                          ...influencersObj,
                          influencerOne:
                            "0x8d5667c2609372Ab5a5e01edFF20b9f0fc3Fe901",
                          influencerOneShare: "3300",
                        });
                      } else {
                        setInfluencersObj({
                          ...influencersObj,
                          influencerOne:
                            "0x0000000000000000000000000000000000000000",
                          influencerOneShare: "0",
                        });
                      }
                    }}
                  />
                  {/* <Button
                    disabled={!!influencersObj?.influencerOne}
                    variant="contained"
                    onClick={() => {
                      setInfluencersObj({
                        ...influencersObj,
                        influencerOne: "0x", //TODO
                      });
                    }}
                  >
                    {influencersObj?.influencerOne ? "Selected" : "Select"}
                  </Button> */}
                </CardActions>
              </Card>
              <Card
                sx={{
                  width: "100%",
                  border:
                    influencersObj.influencerTwo !==
                    "0x0000000000000000000000000000000000000000"
                      ? "1px solid white"
                      : "",
                }}
              >
                <CardContent>
                  <Stack flexDirection={"row"} justifyContent="center">
                    <img src="/spotify_icon.png" width={80} />
                  </Stack>
                </CardContent>
                <CardContent>
                  <Typography align="center" variant="h5">
                    Spotify
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInfluencersObj({
                          ...influencersObj,
                          influencerTwo:
                            "0x8FaFEcF39FCA1A28AB72593609427a8BC25069aA",
                          influencerTwoShare: "3300",
                        });
                      } else {
                        setInfluencersObj({
                          ...influencersObj,
                          influencerTwo:
                            "0x0000000000000000000000000000000000000000",
                          influencerTwoShare: "0",
                        });
                      }
                    }}
                  />
                  {/* <Button
                    disabled={!!influencersObj?.influencerOne}
                    variant="contained"
                    onClick={() => {
                      setInfluencersObj({
                        ...influencersObj,
                        influencerTwo: "0x", //TODO
                      });
                    }}
                  >
                    {influencersObj?.influencerOne ? "Selected" : "Select"}
                  </Button> */}
                </CardActions>
              </Card>
            </Stack>
            {/* <Box my={2}>
              <TextField
                multiline
                label="Add additional infos"
                rows={4}
                fullWidth
              ></TextField>
            </Box> */}
            {/* <Box mt={4} display="flex" gap={2} justifyContent="space-around">
              <TextField
                label="Set Tiktok Budget"
                helperText="can not be more than 33% of the face value"
                type="number"
                onChange={(e) => {
                  setInfluencersObj({
                    ...influencersObj,
                    influencerOneShare: parseInt(e.target.value),
                  });
                }}
                disabled={!influencersObj?.influencerOne}
                InputProps={{
                  inputProps: { min: 1, max: 33 },
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                label="Set Spotify Budget"
                helperText="can not be more than 33% of the face value"
                type="number"
                onChange={(e) => {
                  setInfluencersObj({
                    ...influencersObj,
                    influencerTwoShare: parseInt(e.target.value),
                  });
                }}
                disabled={!influencersObj?.influencerTwo}
                InputProps={{
                  inputProps: { min: 1, max: 33 },
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              ></TextField>
            </Box> */}
            <Box mt={4}>
              <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  if (
                    influencersObj.influencerOne ===
                      "0x0000000000000000000000000000000000000000" &&
                    influencersObj.influencerTwo ===
                      "0x0000000000000000000000000000000000000000"
                  ) {
                    alert("Please select a platform and continue");
                    return;
                  }
                  setMarketingState(influencersObj);
                  goToNextPage();
                }}
              >
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
