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
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Marketing, marketingState, songStreamingInfoState } from "../../state";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { STREAMING_HISTORY } from "../../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Streaming History",
    },
  },
};

type Props = { goToNextPage: () => void };
interface StreamingHistory {
  value: number;
  timestp: string;
  track_domain_id: string;
}

const Promotion = ({ goToNextPage }: Props) => {
  const [promotionsObj, setPromotionsObj] = useState<Marketing>({
    promotionOne: "0x0000000000000000000000000000000000000000",
    promotionOneShare: "0",
    promotionTwo: "0x0000000000000000000000000000000000000000",
    promotionTwoShare: "0",
  });
  const [streamingHistory, setStreamingHistory] =
    useState<StreamingHistory[]>();
  const [_songStreamingState] = useRecoilState(songStreamingInfoState);
  const setMarketingState = useSetRecoilState(marketingState);

  const fetchHistory = async () => {
    const res = await axios.get(`${STREAMING_HISTORY}/31456083`);
    if (res.data.streams) {
      setStreamingHistory(res.data.streams as StreamingHistory[]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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
                    promotionsObj.promotionOne !==
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
                        setPromotionsObj({
                          ...promotionsObj,
                          promotionOne:
                            "0x8d5667c2609372Ab5a5e01edFF20b9f0fc3Fe901",
                          promotionOneShare: "3300",
                        });
                      } else {
                        setPromotionsObj({
                          ...promotionsObj,
                          promotionOne:
                            "0x0000000000000000000000000000000000000000",
                          promotionOneShare: "0",
                        });
                      }
                    }}
                  />
                  {/* <Button
                    disabled={!!promotionsObj?.promotionOne}
                    variant="contained"
                    onClick={() => {
                      setPromotionsObj({
                        ...promotionsObj,
                        promotionOne: "0x", //TODO
                      });
                    }}
                  >
                    {promotionsObj?.promotionOne ? "Selected" : "Select"}
                  </Button> */}
                </CardActions>
              </Card>
              <Card
                sx={{
                  width: "100%",
                  border:
                    promotionsObj.promotionTwo !==
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
                        setPromotionsObj({
                          ...promotionsObj,
                          promotionTwo:
                            "0x8FaFEcF39FCA1A28AB72593609427a8BC25069aA",
                          promotionTwoShare: "3300",
                        });
                      } else {
                        setPromotionsObj({
                          ...promotionsObj,
                          promotionTwo:
                            "0x0000000000000000000000000000000000000000",
                          promotionTwoShare: "0",
                        });
                      }
                    }}
                  />
                  {/* <Button
                    disabled={!!promotionsObj?.promotionOne}
                    variant="contained"
                    onClick={() => {
                      setPromotionsObj({
                        ...promotionsObj,
                        promotionTwo: "0x", //TODO
                      });
                    }}
                  >
                    {promotionsObj?.promotionOne ? "Selected" : "Select"}
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
                  setPromotionsObj({
                    ...promotionsObj,
                    promotionOneShare: parseInt(e.target.value),
                  });
                }}
                disabled={!promotionsObj?.promotionOne}
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
                  setPromotionsObj({
                    ...promotionsObj,
                    promotionTwoShare: parseInt(e.target.value),
                  });
                }}
                disabled={!promotionsObj?.promotionTwo}
                InputProps={{
                  inputProps: { min: 1, max: 33 },
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              ></TextField>
            </Box> */}
            <Box mt={4} display="flex" justifyContent={"space-around"}>
              {streamingHistory && (
                <Line
                  width={150}
                  height={100}
                  options={options}
                  data={{
                    labels: streamingHistory.map((s) => s.timestp.slice(0, 10)),
                    datasets: [
                      {
                        fill: true,
                        label: "No of Streams",
                        data: streamingHistory.map((s) => s.value),
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                        pointBorderWidth: 1,
                        pointStyle: "dash",
                      },
                    ],
                  }}
                />
              )}
            </Box>
            <Box mt={2}>
              {streamingHistory && (
                <Line
                  width={150}
                  height={100}
                  options={options}
                  data={{
                    labels: streamingHistory.map((s) => s.timestp.slice(0, 10)),
                    datasets: [
                      {
                        fill: true,
                        label: "Streams Difference",
                        data: streamingHistory.map((s, i) =>
                          i > 0 ? s.value - streamingHistory[i - 1].value : 0
                        ),
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",

                        pointBorderWidth: 1,
                        pointStyle: "circle",
                      },
                    ],
                  }}
                />
              )}
            </Box>
            <Box mt={4}>
              <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  if (
                    promotionsObj.promotionOne ===
                      "0x0000000000000000000000000000000000000000" &&
                    promotionsObj.promotionTwo ===
                      "0x0000000000000000000000000000000000000000"
                  ) {
                    alert("Please select a platform and continue");
                    return;
                  }
                  setMarketingState(promotionsObj);
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
