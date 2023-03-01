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

  const [streams, setStreams] = useState<StreamingHistory[]>();
  const [streamingHistoryData1, setStreamingHistoryData1] =
    useState<{ x: string; y: number }[]>();
  const [streamingHistoryData2, setStreamingHistoryData2] =
    useState<{ x: string; y: number }[]>();

  const [streamingDayData1, setStreamingDayData1] =
    useState<{ x: string; y: number }[]>();
  const [streamingDayData2, setStreamingDayData2] =
    useState<{ x: string; y: number }[]>();

  const [_songStreamingState] = useRecoilState(songStreamingInfoState);
  const setMarketingState = useSetRecoilState(marketingState);

  const fetchHistory = async () => {
    const res = await axios.get(`${STREAMING_HISTORY}/31456083`);
    if (res.data.streams) {
      // s.timestp.slice(0, 10)
      const _streams = res.data.streams as StreamingHistory[];
      setStreams(_streams);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (streams) {
      if (
        promotionsObj.promotionTwo !=
          "0x0000000000000000000000000000000000000000" &&
        promotionsObj.promotionOne !=
          "0x0000000000000000000000000000000000000000"
      ) {
        const dataSet1 = streams.slice(streams.length - 31).map((s, i) => {
          const today = new Date();
          const result = today.setDate(today.getDate() - (30 - i));
          return {
            x: new Date(result).toLocaleDateString(),
            y: s.value,
          };
        });
        let prevValue = 300 + dataSet1[dataSet1.length - 1].y;
        let tiktokBoost = prevValue + 300 * 4.2;
        const dataSet2 = new Array(30).fill("-").map((_, i) => {
          if (i === 0) {
            return { x: new Date().toLocaleDateString(), y: tiktokBoost };
          } else if (i === 1) {
            const newValue = tiktokBoost + 300 * 4.2;
            return { x: new Date().toLocaleDateString(), y: newValue };
          } else {
            const today = new Date();
            const result = today.setDate(today.getDate() + i);
            prevValue += (prevValue * 3) / 100;
            return {
              x: new Date(result).toLocaleDateString(),
              y: Math.round(prevValue),
            };
          }
        });
        setStreamingHistoryData1(dataSet1);
        setStreamingHistoryData2(dataSet2);
        const dayData1 = dataSet1.map((s, i) => {
          if (i > 0) {
            return {
              x: s.x,
              y: s.y - dataSet1[i - 1].y,
            };
          } else {
            return { x: s.x, y: 0 };
          }
        });
        const dayData2 = dataSet2.map((s, i) => {
          return {
            x: s.x,
            y: s.y - dataSet1[i].y,
          };
        });
        setStreamingDayData1(dayData1);
        setStreamingDayData2(dayData2);
      } else if (
        promotionsObj.promotionTwo !=
        "0x0000000000000000000000000000000000000000"
      ) {
        const dataSet1 = streams.slice(streams.length - 31).map((s, i) => {
          const today = new Date();
          const result = today.setDate(today.getDate() - (30 - i));
          return {
            x: new Date(result).toLocaleDateString(),
            y: s.value,
          };
        });
        let prevValue = 300 + dataSet1[dataSet1.length - 1].y;
        const dataSet2 = new Array(30).fill("-").map((_, i) => {
          if (i === 0) {
            return { x: new Date().toLocaleDateString(), y: prevValue };
          } else {
            const today = new Date();
            const result = today.setDate(today.getDate() + i);
            prevValue += (prevValue * 3) / 100;
            return {
              x: new Date(result).toLocaleDateString(),
              y: Math.round(prevValue),
            };
          }
        });
        setStreamingHistoryData1(dataSet1);
        setStreamingHistoryData2(dataSet2);
        const dayData1 = dataSet1.map((s, i) => {
          if (i > 0) {
            return {
              x: s.x,
              y: s.y - dataSet1[i - 1].y,
            };
          } else {
            return { x: s.x, y: 0 };
          }
        });
        const dayData2 = dataSet2.map((s, i) => {
          return {
            x: s.x,
            y: s.y - dataSet1[i].y,
          };
        });
        setStreamingDayData1(dayData1);
        setStreamingDayData2(dayData2);
      } else if (
        promotionsObj.promotionOne !=
        "0x0000000000000000000000000000000000000000"
      ) {
        // TIKTOK
        const dataSet1 = streams.slice(streams.length - 31).map((s, i) => {
          const today = new Date();
          const result = today.setDate(today.getDate() - (30 - i));
          return {
            x: new Date(result).toLocaleDateString(),
            y: s.value,
          };
        });
        let prevValue = 300 * 4.2 + dataSet1[dataSet1.length - 1].y;
        const dataSet2 = new Array(30).fill("-").map((_, i) => {
          if (i === 0) {
            return { x: new Date().toLocaleDateString(), y: prevValue };
          } else if (i === 1) {
            prevValue += 300 * 4.2;
            return { x: new Date().toLocaleDateString(), y: prevValue };
          } else {
            const today = new Date();
            const result = today.setDate(today.getDate() + i);
            return {
              x: new Date(result).toLocaleDateString(),
              y: Math.round(dataSet1[i].y),
            };
          }
        });
        setStreamingHistoryData1(dataSet1);
        setStreamingHistoryData2(dataSet2);
        const dayData1 = dataSet1.map((s, i) => {
          if (i > 0) {
            return {
              x: s.x,
              y: s.y - dataSet1[i - 1].y,
            };
          } else {
            return { x: s.x, y: 0 };
          }
        });
        const dayData2 = dataSet2.map((s, i) => {
          return {
            x: s.x,
            y: s.y - dataSet1[i].y,
          };
        });
        setStreamingDayData1(dayData1);
        setStreamingDayData2(dayData2);
      } else {
        const dataSet1 = streams.map((s, i) => {
          // const today = new Date();
          // const result = today.setDate(today.getDate() - (30 - i));
          return {
            x: s.timestp.slice(0, 10),
            y: s.value,
          };
        });
        setStreamingHistoryData1(dataSet1);
        const dayData1 = dataSet1.map((s, i) => {
          if (i > 0) {
            return {
              x: s.x,
              y: s.y - dataSet1[i - 1].y,
            };
          } else {
            return { x: s.x, y: 0 };
          }
        });
        setStreamingDayData1(dayData1);
      }
    }
  }, [streams, promotionsObj]);

  const historyData =
    promotionsObj.promotionTwo !=
      "0x0000000000000000000000000000000000000000" ||
    promotionsObj.promotionOne != "0x0000000000000000000000000000000000000000"
      ? [
          {
            fill: true,
            label: "No of Streams",
            data: streamingHistoryData1,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            fill: true,
            label: "Expected Growth",
            data: streamingHistoryData2,
            borderColor: "rgb(91, 33, 212)",
            backgroundColor: "rgba(91, 33, 212, 0.5)",
          },
        ]
      : [
          {
            fill: true,
            label: "No of Streams",
            data: streamingHistoryData1,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ];
  const dayData =
    promotionsObj.promotionTwo !=
      "0x0000000000000000000000000000000000000000" ||
    promotionsObj.promotionOne != "0x0000000000000000000000000000000000000000"
      ? [
          {
            fill: true,
            label: "Streams per day",
            data: streamingDayData1,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            fill: true,
            label: "Expected Growth in Streams per Day",
            data: streamingDayData2,
            borderColor: "rgb(91, 33, 212)",
            backgroundColor: "rgba(91, 33, 212, 0.5)",
          },
        ]
      : [
          {
            fill: true,
            label: "Streams per day",
            data: streamingDayData1,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ];

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
                </CardActions>
              </Card>
            </Stack>
            <Box mt={4} display="flex" justifyContent={"space-around"}>
              {streams && (
                <Line
                  width={150}
                  height={100}
                  options={options}
                  data={{
                    datasets: historyData,
                  }}
                />
              )}
            </Box>
            <Box mt={2}>
              {streams && (
                <Line
                  width={150}
                  height={100}
                  options={options}
                  data={{
                    // labels: streamingHistory.map((s) => s.timestp.slice(0, 10)),
                    datasets: dayData,
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
