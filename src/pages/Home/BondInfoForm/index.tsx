import {
  Box,
  Typography,
  TextField,
  Slider,
  Mark,
  Button,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  AccumulationChartComponent,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTooltip,
  Inject,
  PieSeries,
} from "@syncfusion/ej2-react-charts";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import Footer from "../../../components/Footer";
import { pendingAssetPoolInfo } from "../../../state";
import axios from "axios";
import {
  // SPOTIFY_IDS_URL,
  SPOTIFY_LISTENERS_ISRC,
  // SPOTIFY_LISTENERS_URL,
  YOUTUBE_SUBSCRIBERS_URL,
  YOUTUBE_VIEWS_URL,
} from "../../../constants";
import { useWeb3React } from "@web3-react/core";
// import GaugeChart from "react-gauge-chart";
import CloseIcon from "@mui/icons-material/Close";

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

export const supportedCurrencies = [
  // { id: 0, currency: "DAI" },
  { id: 0, currency: "USDC" },
  // { id: 2, currency: "LINK" },
  // { id: 3, currency: "BTC" },
];

const BondInfoForm = () => {
  const classes = useStyles();
  const history = useHistory();

  // const { getPrice } = usePrice();
  const setPendingAssetPoolState = useSetRecoilState(pendingAssetPoolInfo);

  const [nftBondName, setNftBondName] = useState<string>("");
  const [nftBondSymbol, setNftBondSymbol] = useState<string>("");
  const [spotifyId, setSpotifyId] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(3);
  const [bondValue, setBondValue] = useState(1);
  const [splitSliderData, setSplitSliderData] = useState<Mark[]>([]);
  const [selectedSplitValue, setSelectedSplitValue] = useState(15000);
  const [noOfSplits, setNoOfSplits] = useState<number>(1);
  const [pieData, setPieData] = useState<Mark[]>([]);
  const [enteredCollateralAmount, setEnteredCollateralAmount] =
    useState<number>();
  const [selectedCurrency, setSelectedCurrency] = useState<number>(0);
  const [latestSelectedCurrencyPrice, setLatestSelectedCurrencyPrice] =
    useState<number>();
  const [isSpotifyError, setIsSpotifyError] = useState<boolean>(false);
  const [isYoutubeError, setIsYoutubeError] = useState<boolean>(false);
  const [spotifyListeners, setSpotifyListeners] = useState<number>();
  const [songTitle, setSongTitle] = useState<string>();
  const [idsObj, setIdsObj] = useState<{
    soundChartId: string;
    songStatId: string;
  }>();
  const [youtubeId, setYoutubeId] = useState<string>();
  const [youtubeSubscribers, setYoutubeSubscribers] = useState<number>();
  const [artistName, setArtistName] = useState<string>("");
  const [isInstantLiquidity, setIsInstantLiquidity] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { account } = useWeb3React();

  const [csvData, setCsvData] = useState<string | ArrayBuffer | null>();
  const [columns, setColumns] = useState<string[]>();
  const [rows, setRows] = useState<string[][]>();
  const [showTable, setShowTable] = useState(false);

  const onBondValueChange = (e: any) => {
    const enteredValue = parseInt(e.target.value);
    setBondValue(enteredValue);
  };

  const onClickToDeposit = () => {
    //spotifyListeners &&
    if (!account) {
      alert("Kindly connect your wallet and try again.");
      return;
    }
    if (
      youtubeSubscribers &&
      enteredCollateralAmount &&
      youtubeId &&
      idsObj?.songStatId &&
      idsObj.soundChartId
    ) {
      setPendingAssetPoolState({
        nftBondName,
        nftBondSymbol,
        nftMarketPlace: "opensea",
        isCollateralDeposited: false,
        spotifyId,
        youtubeUrl,
        collateralAmount: enteredCollateralAmount,
        termInYears: selectedTerm,
        faceValue: bondValue,
        currencyId: selectedCurrency,
        individualBondValue: selectedSplitValue,
        noOfBonds: noOfSplits,
        spotifyListeners: spotifyListeners ?? 0,
        youtubeSubscribers,
        artistName,
        youtubeId: youtubeId,
        soundChartId: idsObj.soundChartId,
        songStatId: idsObj?.songStatId,
        //TODO
        apAddress: "",
        nftAddress: "",
      });
      history.push("/home/mint/opensea/deposit");
    } else {
      alert("Kindly fill all the fields.");
    }
  };
  console.log({ spotifyListeners, youtubeSubscribers });

  const onCurrencyChange = async (e: any) => {
    const currenyId = parseInt(e.target.value);
    setSelectedCurrency(currenyId);
    // const price = await getPrice(supportedCurrencies[currenyId].currency);
    // setLatestSelectedCurrencyPrice(price);
  };
  const onCollateralAmountChange = (e: any) => {
    const collateral = parseFloat(e.target.value);
    setEnteredCollateralAmount(collateral);
  };

  const setSpotifyListenersData = async (_spotifyId: string): Promise<void> => {
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

  const setYoutubeSubscribersData = async (
    _channelUrl: string
  ): Promise<void> => {
    try {
      const data = await axios.post(YOUTUBE_SUBSCRIBERS_URL, {
        data: { id: _channelUrl },
      });
      console.log({ data });
      if (data.data.result) {
        setYoutubeSubscribers(data.data.result);
        setIsYoutubeError(false);
      } else {
        setIsYoutubeError(true);
      }
    } catch (e) {
      setIsYoutubeError(true);
    }
  };

  const setYoutubeViewsCount = async (_videoUrl: string): Promise<void> => {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = _videoUrl.match(regExp);

    if (match && match[2]) {
      setYoutubeId(match[2]);
      try {
        const res = await axios.get(`${YOUTUBE_VIEWS_URL}/${match[2]}`);

        if (res.data.listeners) {
          setYoutubeSubscribers(Number(res.data.listeners));
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

  const calculateBondValueWithPrice = async () => {
    if (enteredCollateralAmount && selectedTerm) {
      const price = latestSelectedCurrencyPrice;
      setLatestSelectedCurrencyPrice(price);
      const calculatedFaceValue = enteredCollateralAmount * selectedTerm * 4;
      setBondValue(calculatedFaceValue);
    }
  };
  useEffect(() => {
    calculateBondValueWithPrice();
  }, [selectedTerm, enteredCollateralAmount]);

  useEffect(() => {
    const marks = new Array(50).fill("-").map((val, i) => ({
      value: i + 1,
      label: `${bondValue / (i + 1)}`,
      noOfSlice: i + 1,
    }));
    setSplitSliderData(marks);
    const newMark = marks[(pieData.length || 1) - 1];
    setSelectedSplitValue(parseFloat(newMark.label));
  }, [bondValue]);

  useEffect(() => {
    if (selectedSplitValue && splitSliderData.length) {
      const length = (
        splitSliderData.filter(
          (mark) => mark.label === `${selectedSplitValue}`
        )[0] as any
      ).noOfSlice;
      setPieData(
        new Array(length).fill("-").map(() => ({
          value: selectedSplitValue,
        }))
      );
    }
  }, [selectedSplitValue, splitSliderData]);

  useEffect(() => {
    if (spotifyId) {
      setSpotifyListenersData(spotifyId);
    }
  }, [spotifyId]);
  useEffect(() => {
    if (youtubeUrl) {
      // setYoutubeSubscribersData(youtubeUrl);
      setYoutubeViewsCount(youtubeUrl);
    }
  }, [youtubeUrl]);
  useEffect(() => {
    if (!latestSelectedCurrencyPrice) {
      (async () => {
        // const price = await getPrice("ETH");
        // setLatestSelectedCurrencyPrice(price);
      })();
    }
  }, []);
  // const ColorlibStepIconRoot = styled("div")<{
  //   ownerState: { completed?: boolean; active?: boolean };
  // }>(({ theme, ownerState }) => ({
  //   backgroundColor:
  //     theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  //   zIndex: 1,
  //   color: "#fff",
  //   width: 50,
  //   height: 50,
  //   display: "flex",
  //   borderRadius: "50%",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   ...(ownerState.active && {
  //     backgroundImage:
  //       "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  //     boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  //   }),
  //   ...(ownerState.completed && {
  //     backgroundImage:
  //       "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  //   }),
  // }));
  // function ColorlibStepIcon(props: StepIconProps) {
  //   const { active, completed, className } = props;

  //   const icons: { [index: string]: React.ReactElement } = {
  //     1: <SettingsIcon />,
  //     2: <GroupAddIcon />,
  //     3: <VideoLabelIcon />,
  //   };
  //   return (
  //     <ColorlibStepIconRoot
  //       ownerState={{ completed, active }}
  //       className={className}
  //     >
  //       {icons[String(props.icon)]}
  //     </ColorlibStepIconRoot>
  //   );
  // }
  // const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  //   [`&.${stepConnectorClasses.alternativeLabel}`]: {
  //     top: 22,
  //   },
  //   [`&.${stepConnectorClasses.active}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       backgroundImage:
  //         "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
  //     },
  //   },
  //   [`&.${stepConnectorClasses.completed}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       backgroundImage:
  //         "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
  //     },
  //   },
  //   [`& .${stepConnectorClasses.line}`]: {
  //     height: 3,
  //     border: 0,
  //     backgroundColor:
  //       theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
  //     borderRadius: 1,
  //   },
  // }));

  // const steps = ["Song", "Artist", "Bond", "Collateral", "Marketing", "Sell"];

  //   return (
  //     <Box pt={4}>
  //       <Stepper
  //         alternativeLabel
  //         activeStep={1}
  //         connector={<ColorlibConnector />}
  //       >
  //         {steps.map((label) => (
  //           <Step key={label}>
  //             <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
  //           </Step>
  //         ))}
  //       </Stepper>
  //     </Box>
  //   );
  // };
  return (
    <Box pt={4}>
      <Typography variant="h4" fontWeight="600" align="center">
        NFT Bond Information
      </Typography>
      <Typography pt={2} align="center">
        Fill in the following information for your NFT bond. The following
        information is used to determine the face value of your NFT bond
      </Typography>
      <Grid container>
        <Grid md={3} item></Grid>
        <Grid xs={12} md={7} item>
          <Box display="flex" mt={3} flexDirection="column">
            <Box mt={2}>
              <Box mb={2}>
                <Typography variant="h6" fontWeight="600">
                  Song Information
                </Typography>
              </Box>

              <Box mt={2}>
                <Box>
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
                  >
                    Upload CSV
                    <input hidden accept=".csv" type="file" />
                  </Button>
                  {csvData && (
                    <Button
                      size="small"
                      color="info"
                      onClick={() => {
                        setShowTable(true);
                      }}
                    >
                      open table
                    </Button>
                  )}
                </Box>
              </Box>
              <Box my={2}>
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
                    style={{ width: "40%" }}
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
                  {youtubeSubscribers && (
                    <Typography
                      // color="gray"
                      // fontSize="12px"
                      display="inline"
                      fontStyle="italic"
                      fontWeight={600}
                    >
                      (
                      {youtubeSubscribers
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      views)
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Box mb={2}>
                <Typography variant="h6" fontWeight="600">
                  Bond Issuer
                </Typography>
              </Box>
              <Box mb={2} display="flex" alignItems={"center"}>
                <Box flexBasis="50%">
                  <Typography>Name</Typography>
                  <TextField
                    variant="outlined"
                    value={artistName}
                    disabled
                    placeholder="autofill"
                  />
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Box mb={2}>
                <Typography variant="h6" fontWeight="600">
                  NFT Information
                </Typography>
              </Box>
              <Box mb={2} display="flex">
                <Box flexBasis="50%" display="flex">
                  <Box mr={2}>
                    {preview && (
                      <img
                        src={preview}
                        alt="prev"
                        width={100}
                        height={100}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    )}
                  </Box>
                  <Box>
                    <Typography>NFT Name</Typography>
                    <TextField
                      variant="outlined"
                      value={nftBondName}
                      onChange={(e) => setNftBondName(e.target.value)}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography>NFT Symbol</Typography>
                  <TextField
                    variant="outlined"
                    value={nftBondSymbol}
                    onChange={(e) => setNftBondSymbol(e.target.value)}
                  />
                </Box>
                {/* <Box>
                  {selectedFile ? (
                    <img
                      src={preview}
                      alt="prev"
                      width={100}
                      height={100}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      component="label"
                      onChange={(e: any) => {
                        if (e.target.files.length === 0) return;
                        const file = e.target.files[0];
                        setSelectedFile(file);
                        setPreview(URL.createObjectURL(file));
                      }}
                    >
                      Upload Picture
                      <input hidden accept="image/*" type="file" />
                    </Button>
                  )}
                </Box> */}
              </Box>
            </Box>

            <Box mt={2}>
              <Box mb={2}>
                <Typography variant="h6" fontWeight="600">
                  Bond Information
                </Typography>
              </Box>
              <Box display="flex">
                <Box flexBasis="50%">
                  <Box mb={2}>
                    <Typography>Collateral Deposit for Q1 Year 0</Typography>
                    <Box>
                      <TextField
                        variant="outlined"
                        color="primary"
                        placeholder="Enter collateral deposit amount"
                        type="number"
                        style={{ width: "45%" }}
                        value={enteredCollateralAmount}
                        onChange={onCollateralAmountChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              USDC
                            </InputAdornment>
                          ),
                        }}
                      />
                      {/* <Box display="inline" ml={2}>
                  <Select
                    value={selectedCurrency}
                    onChange={onCurrencyChange}
                  >
                    {supportedCurrencies.map(({ id, currency }) => (
                      <MenuItem key={id} value={id}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                  {latestSelectedCurrencyPrice && (
                    <Typography display="inline" fontStyle="italic">
                      (
                      {(
                        latestSelectedCurrencyPrice *
                        (enteredCollateralAmount || 0)
                      ).toFixed(2)}{" "}
                      USD )
                    </Typography>
                  )}
                </Box> */}
                    </Box>
                  </Box>
                  <Box mb={2} style={{ width: "80%" }}>
                    <Typography>Select Term</Typography>
                    <Box mt={6}>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={3}
                        onChangeCommitted={(e, value) => {
                          setSelectedTerm(value as number);
                        }}
                        valueLabelDisplay="on"
                        valueLabelFormat={(val: number) => `${val} year(s)`}
                      />
                    </Box>
                  </Box>
                  <Box mb={2} mt={"30px"}>
                    <Typography>Face Value</Typography>
                    <Box display="flex" alignItems="center">
                      <TextField
                        variant="outlined"
                        color="primary"
                        placeholder="Enter USD face value of bond"
                        type="number"
                        onChange={onBondValueChange}
                        value={bondValue}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              USDC
                            </InputAdornment>
                          ),
                        }}
                      />
                      {/* {latestSelectedCurrencyPrice && (
                  <Typography fontStyle="italic">
                    ({(bondValue * latestSelectedCurrencyPrice).toFixed(2)}{" "}
                    USD)
                  </Typography>
                )} */}
                    </Box>
                  </Box>
                </Box>
                <Box flexBasis="50%" width={"100%"}>
                  <Box width={"100%"} display={"flex"} flexDirection={"column"}>
                    <Typography>Value Summary</Typography>
                    <Box width={"100%"} display={"flex"}>
                      <Box className={classes.summary} mt={1}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          p={1}
                          pb={0}
                        >
                          <Typography fontWeight="bold" color="black">
                            Collateral Deposit
                          </Typography>
                          <Typography color="black">
                            {enteredCollateralAmount || "--"}
                            {" " +
                              supportedCurrencies[selectedCurrency].currency}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          p={1}
                          pb={0}
                        >
                          <Typography fontWeight="bold" color="black">
                            Term
                          </Typography>
                          <Typography color="black">
                            {selectedTerm} year(s)
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          p={1}
                          pb={0}
                        >
                          <Typography fontWeight="bold" color="black">
                            Face Value
                          </Typography>
                          <Typography color="black">
                            USDC {bondValue}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          p={1}
                          pb={0}
                        >
                          <Typography fontWeight="bold" color="black">
                            Individual Bond Value
                          </Typography>
                          <Typography color="black">
                            USDC {selectedSplitValue.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          p={1}
                        >
                          <Typography fontWeight="bold" color="black">
                            No of Bond Segmants
                          </Typography>
                          <Typography color="black">
                            {pieData.length}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mt={2} mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Individual Bond Value
              </Typography>
              <Box mt={2} display="flex">
                <Box
                  flexBasis={"50%"}
                  display="flex"
                  flexDirection={"column"}
                  // justifyContent="center"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          checked={isInstantLiquidity}
                          onChange={(e, checked) => {
                            setIsInstantLiquidity(checked);
                            if (checked) {
                              setNoOfSplits(0);
                              setSelectedSplitValue(
                                parseFloat(splitSliderData[0].label as string)
                              );
                            }
                          }}
                        />
                      }
                      label="Instant Liquidity"
                    />
                  </FormGroup>
                  <Box
                    mt={6}
                    mx={2}
                    style={{
                      visibility: isInstantLiquidity ? "hidden" : "visible",
                    }}
                  >
                    <Slider
                      valueLabelDisplay="on"
                      min={1}
                      max={50}
                      step={1}
                      defaultValue={1}
                      disabled={isInstantLiquidity}
                      onChangeCommitted={(e, val) => {
                        setNoOfSplits(val as number);
                        setSelectedSplitValue(
                          parseFloat(
                            splitSliderData[(val as number) - 1].label as string
                          )
                        );
                      }}
                    ></Slider>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  // justifyContent="center"
                  style={{ width: "100%" }}
                  flexBasis={"50%"}
                >
                  {pieData.length > 0 && (
                    <AccumulationChartComponent
                      id="pie-chart"
                      legendSettings={{ visible: false }}
                      enableSmartLabels={true}
                      enableAnimation={true}
                      center={{ x: "50%", y: "45%" }}
                      tooltip={{ enable: false }}
                      // highlightPattern="Bubble"
                      // highLightMode="Point"
                      background="#17172F"
                      width="300px"
                      height="300px"
                    >
                      <Inject
                        services={[
                          AccumulationLegend,
                          PieSeries,
                          AccumulationTooltip,
                          AccumulationDataLabel,
                        ]}
                      />
                      <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective
                          innerRadius="20%"
                          dataSource={pieData}
                          name="Browser"
                          xName="label"
                          yName="value"
                          explode={true}
                          explodeOffset="10%"
                          explodeIndex={0}
                          dataLabel={{
                            visible: true,
                            position: "Outside",
                            name: "text",
                            font: {
                              fontWeight: "600",
                            },
                          }}
                          // radius="r"
                        ></AccumulationSeriesDirective>
                      </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                  )}
                </Box>
              </Box>
            </Box>
            <Box mt={2} mb={2}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Bond Rating
              </Typography>
              <Box display="flex" alignItems={"center"}>
                <Box flexBasis={"50%"}>
                  <Box>
                    <Grid
                      container
                      rowGap={1}
                      p={2}
                      className={classes.summary}
                    >
                      <Grid xs={6}>
                        <Typography color={"black"} fontWeight={600}>
                          Rating
                        </Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography color={"black"}>AAA</Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography color={"black"} fontWeight={600}>
                          Grade
                        </Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography color={"black"}>Investment</Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography color={"black"} fontWeight={600}>
                          Spotify Median
                        </Typography>
                      </Grid>
                      {spotifyListeners && youtubeSubscribers ? (
                        <Grid xs={6}>
                          <Typography color={"black"}>
                            {(
                              (spotifyListeners + youtubeSubscribers) /
                              2
                            ).toFixed(0)}
                          </Typography>
                        </Grid>
                      ) : (
                        <Typography>-</Typography>
                      )}
                    </Grid>
                  </Box>
                </Box>
                {/* <Box
                  flexBasis={"50%"}
                  // display={"flex"}
                  // justifyContent="center"
                  width={"100%"}
                >
                  <GaugeChart
                    nrOfLevels={4}
                    arcPadding={0.1}
                    cornerRadius={6}
                    percent={0.06}
                    hideText
                    style={{ width: "65%" }}
                  />
                  <Box
                    width={"65%"}
                    display="flex"
                    justifyContent={"space-between"}
                    px={4}
                  >
                    <Typography variant="caption" fontWeight={600}>
                      Low Risk
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      High Risk
                    </Typography>
                  </Box>
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid md={2} item></Grid>
      </Grid>
      <Footer position="relative">
        <Button>
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right" }}
            onClick={onClickToDeposit}
          >
            Continue to Deposit Collateral
          </Button>
        </Button>
      </Footer>
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
    </Box>
  );
};

export default BondInfoForm;
// linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)
