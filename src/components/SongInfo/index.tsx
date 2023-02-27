import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { SPOTIFY_LISTENERS_ISRC, YOUTUBE_VIEWS_URL } from "../../constants";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useSetRecoilState } from "recoil";
import { songStreamingInfoState } from "../../state";

type Props = {
  goToNextPage: () => void;
};

const useStyles = makeStyles({
  root: {
    borderColor: "#4AAB1A",
  },
  summary: {
    backgroundColor: "white",
    borderRadius: 4,
    width: "70%",
  },
});

const SongInfo = ({ goToNextPage }: Props) => {
  const classes = useStyles();
  const [csvData, setCsvData] = useState<string | ArrayBuffer | null>();
  const [columns, setColumns] = useState<string[]>();
  const [rows, setRows] = useState<string[][]>();
  const [showTable, setShowTable] = useState(false);
  const [spotifyId, setSpotifyId] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isSpotifyError, setIsSpotifyError] = useState<boolean>(false);
  const [isYoutubeError, setIsYoutubeError] = useState<boolean>(false);
  const [spotifyListeners, setSpotifyListeners] = useState<number>();
  const [youtubeViews, setYoutubeViews] = useState<number>();
  const [songTitle, setSongTitle] = useState<string>();
  const [preview, setPreview] = useState<string>();
  const [idsObj, setIdsObj] = useState<{
    soundChartId: string;
    songStatId: string;
  }>();
  const [artistName, setArtistName] = useState<string>("");
  const [youtubeId, setYoutubeId] = useState<string>("");
  const setPendingAssetPoolState = useSetRecoilState(songStreamingInfoState);

  const getSpotifyListenersData = async (_spotifyId: string): Promise<void> => {
    try {
      const res = await axios.get(`${SPOTIFY_LISTENERS_ISRC}/${_spotifyId}`);

      if (res.data.listeners) {
        const {
          listeners,
          soundChartId,
          songStatId,
          songTitle: _songTitle,
          artistName: _artistName,
          songImageUrl,
        } = res.data;
        setPreview(songImageUrl);
        setIdsObj({ soundChartId, songStatId });
        setSpotifyListeners(listeners);
        setSongTitle(_songTitle);
        setIsSpotifyError(false);
        setArtistName(_artistName);
        // try {
        //   const ids = await axios.post(SPOTIFY_IDS_URL, {
        //     id: _spotifyId,
        //   });
        //   if (ids.data.length) {
        //     setArtistName(ids.data[0].artist_name);
        //   }
        // } catch (e) {
        //   console.log(e);
        // }
      } else {
        setIsSpotifyError(true);
      }
    } catch (e) {
      setIsSpotifyError(true);
    }
  };

  const getYoutubeViewsCount = async (_videoUrl: string): Promise<void> => {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = _videoUrl.match(regExp);

    if (match && match[2]) {
      setYoutubeId(match[2]);
      try {
        const res = await axios.get(`${YOUTUBE_VIEWS_URL}/${match[2]}`);

        if (res.data.listeners) {
          setYoutubeViews(Number(res.data.listeners));
          setIsYoutubeError(false);
        } else {
          setIsYoutubeError(true);
        }
      } catch (e) {
        setIsYoutubeError(true);
      }
    } else {
      setIsYoutubeError(true);
    }
  };

  useEffect(() => {
    if (spotifyId) {
      getSpotifyListenersData(spotifyId);
    }
  }, [spotifyId]);
  useEffect(() => {
    if (youtubeUrl) {
      // setYoutubeSubscribersData(youtubeUrl);
      getYoutubeViewsCount(youtubeUrl);
    }
  }, [youtubeUrl]);

  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={8}>
            <Stack mt={2}>
              <Stack flexDirection={"row"}>
                <Button
                  variant="contained"
                  component="label"
                  onChange={(e: any) => {
                    if (e.target.files.length === 0) return;
                    const file = e.target.files[0];
                    var reader = new FileReader();
                    reader.onload = (e) => {
                      // Use reader.result
                      // this.setState({
                      //   csvData: reader.result,
                      // });
                      if (reader.result) {
                        setCsvData(reader.result);
                        const res = (reader.result as string).split("\r\n");
                        const _columns = res[0].split(",");
                        setColumns(_columns);
                        const _rows: string[][] = [];
                        for (let i = 1; i < res.length - 1; i++) {
                          const splits = res[i].split(",");
                          _rows.push(splits);
                        }
                        setRows(_rows);
                        setShowTable(true);
                      }
                    };
                    reader.readAsText(file);
                  }}
                  sx={{ width: 250 }}
                >
                  Upload Financial Statement
                  <input hidden accept=".csv" type="file" />
                </Button>
                {csvData && (
                  <Button
                    size="small"
                    color="info"
                    onClick={() => {
                      setShowTable(true);
                    }}
                    sx={{ ml: 1 }}
                  >
                    open table
                  </Button>
                )}
              </Stack>
              <Typography sx={{ mt: 1 }} variant="caption">
                Our AI engine will calculate the eligibility of your songs
              </Typography>
            </Stack>
            <Box my={4}>
              <Typography>ISRC</Typography>
              <Box display="flex" alignItems={"center"}>
                <TextField
                  variant="outlined"
                  // placeholder="Enter your Spotify Artist ID"
                  placeholder="ISRC"
                  className={classes.root}
                  value={spotifyId}
                  onChange={(e) => setSpotifyId(e.target.value)}
                  error={isSpotifyError}
                  helperText={isSpotifyError && "Invalid Spotify Artist Id"}
                  style={{ width: "300px" }}
                  // InputProps={{
                  //   endAdornment: (
                  //     <img src="/spotify.png" alt="" width={"40px"} />
                  //   ),
                  // }}
                />
                {spotifyListeners && (
                  <Typography
                    // fontSize="12px"
                    display="inline"
                    fontStyle="italic"
                    // color="#c4c4c4"
                    fontWeight={600}
                  >
                    ( {songTitle} :{" "}
                    {spotifyListeners
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    monthly spotify listeners)
                  </Typography>
                )}
              </Box>
            </Box>
            <Box mb={2}>
              <Typography>Youtube Video URL</Typography>
              <Box display="flex" alignItems={"center"}>
                <TextField
                  variant="outlined"
                  color="primary"
                  placeholder="Enter your Youtube Video URL"
                  style={{ width: "60%" }}
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  error={isYoutubeError}
                  helperText={isYoutubeError && "Invalid Youtube video Url"}
                  InputProps={{
                    endAdornment: (
                      <img src="/youtube.png" alt="" width={"40px"} />
                    ),
                  }}
                />
                {youtubeViews && (
                  <Typography
                    // color="gray"
                    // fontSize="12px"
                    display="inline"
                    fontStyle="italic"
                    fontWeight={600}
                  >
                    (
                    {youtubeViews
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    views)
                  </Typography>
                )}
              </Box>
            </Box>
            <Box mt={4}>
              <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  if (
                    !artistName.length ||
                    !idsObj?.soundChartId ||
                    !idsObj?.soundChartId ||
                    !youtubeId.length ||
                    !youtubeViews ||
                    !spotifyListeners ||
                    !preview
                  ) {
                    if (!spotifyListeners) {
                      alert(
                        `Spotify Listeners data isn't available for the ISRC`
                      );
                      return;
                    }
                    if (!youtubeId.length) {
                      alert(`Unable to fetch youtube views for the URL`);
                      return;
                    }
                    alert(
                      "Missing Song information, please check the provided ISRC and Youtube video URL"
                    );
                    return;
                  }
                  setPendingAssetPoolState({
                    artistName,
                    songStatId: idsObj?.songStatId,
                    soundChartId: idsObj?.soundChartId,
                    spotifyId,
                    youtubeUrl,
                    youtubeId,
                    youtubeViews,
                    spotifyListeners,
                    songImageUrl: preview,
                  });
                  goToNextPage();
                }}
              >
                continue to nft info
              </Button>
            </Box>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Box>
      <Dialog open={showTable} maxWidth={"xl"}>
        <DialogTitle>
          Artist Income Details
          <IconButton
            aria-label="close"
            onClick={() => {
              setShowTable(false);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContentText pl={3}>
          <Stack>
            <Typography variant="caption">
              <Typography component={"span"} color="green" variant="caption">
                ELEGIBLE
              </Typography>{" "}
              tracks have passed our AI financial check.
            </Typography>
            <Typography variant="caption">
              <Typography component={"span"} color="red" variant="caption">
                NOT ELEGIBLE
              </Typography>{" "}
              tracks have not met our financial check and need more streams to
              be issued as an NFT NOTES
            </Typography>
          </Stack>
        </DialogContentText>
        <DialogContent>
          {rows && columns && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columns.slice(0, 12).map((col) => (
                      <TableCell>{col}</TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow
                      hover
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {row.slice(0, 12).map((data) => (
                        <TableCell key={data} size="small">
                          {data}
                        </TableCell>
                      ))}
                      <TableCell>
                        <Button
                          color="info"
                          disabled={Number(row[11]) < 20}
                          onClick={() => {
                            setSpotifyId(row[12]);
                            setYoutubeUrl(row[13]);
                            setShowTable(false);
                          }}
                        >
                          {Number(row[11]) > 20 ? "Eligible" : "Not Eligible"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default SongInfo;
