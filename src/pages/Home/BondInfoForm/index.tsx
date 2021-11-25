import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Slider,
  Mark,
  Button,
  InputAdornment,
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
import usePrice from "../../../hooks/usePrice";

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
  { id: 0, currency: "DAI" },
  { id: 1, currency: "ETH" },
  { id: 2, currency: "LINK" },
  { id: 3, currency: "BTC" },
];

const BondInfoForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const { getPrice } = usePrice();
  const setPendingAssetPoolState = useSetRecoilState(pendingAssetPoolInfo);

  const [nftBondName, setNftBondName] = useState<string>("");
  const [nftBondSymbol, setNftBondSymbol] = useState<string>("");
  const [spotifyId, setSpotifyId] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(3);
  const [bondValue, setBondValue] = useState(15000);
  const [splitSliderData, setSplitSliderData] = useState<Mark[]>([]);
  const [selectedSplitValue, setSelectedSplitValue] = useState(15000);
  const [noOfSplits, setNoOfSplits] = useState<number>(0);
  const [pieData, setPieData] = useState<Mark[]>([]);
  const [enteredCollateralAmount, setEnteredCollateralAmount] =
    useState<number>();
  const [selectedCurrency, setSelectedCurrency] = useState<number>(1);
  const [latestSelectedCurrencyPrice, setLatestSelectedCurrencyPrice] =
    useState<number>();

  const onBondValueChange = (e: any) => {
    const enteredValue = parseInt(e.target.value);
    setBondValue(enteredValue);
  };

  const onClickToDeposit = () => {
    setPendingAssetPoolState({
      nftBondName,
      nftBondSymbol,
      nftMarketPlace: "opeansea",
      isCollateralDeposited: false,
      spotifyId,
      youtubeUrl,
      collateralAmount: enteredCollateralAmount || 0,
      termInYears: selectedTerm,
      faceValue: bondValue,
      currencyId: selectedCurrency,
      individualBondValue: selectedSplitValue,
      noOfBonds: noOfSplits,
      //TODO
      artistName: "---",
      apAddress: "",
      nftAddress: "",
    });
    history.push("/home/mint/opensea/deposit");
  };

  const onCurrencyChange = async (e: any) => {
    const currenyId = parseInt(e.target.value);
    setSelectedCurrency(currenyId);
    const price = await getPrice(supportedCurrencies[currenyId].currency);
    setLatestSelectedCurrencyPrice(price);
  };
  const onCollateralAmountChange = (e: any) => {
    const collateral = parseFloat(e.target.value);
    setEnteredCollateralAmount(collateral);
  };

  useEffect(() => {
    if (selectedTerm && enteredCollateralAmount) {
      const calculatedFaceValue = enteredCollateralAmount * selectedTerm * 4;
      setBondValue(calculatedFaceValue);
    }
  }, [selectedTerm, enteredCollateralAmount]);

  useEffect(() => {
    const marks = new Array(50).fill("-").map((val, i) => ({
      value: i + 1,
      label: `${Math.floor(bondValue / (i + 1))}`,
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

  return (
    <Box pt={4}>
      <Typography variant="h4" fontWeight="600" align="center">
        NFT Bond Information
      </Typography>
      <Typography pt={2} align="center">
        Fill in the following information for your NFT bond. The following
        information is used to determine the face value of your NFT bond
      </Typography>
      <Box display="flex" mt={3} flexDirection="column" pl={30}>
        <Box mt={2}>
          <Box mb={2}>
            <Typography variant="h6" fontWeight="600">
              NFT Information
            </Typography>
          </Box>
          <Box mb={2} display="flex">
            <Box flexBasis="50%">
              <Typography>NFT Name</Typography>
              <TextField
                variant="outlined"
                value={nftBondName}
                onChange={(e) => setNftBondName(e.target.value)}
              />
            </Box>
            <Box>
              <Typography>NFT Marketplace</Typography>
              <TextField
                variant="outlined"
                disabled
                color="success"
                value="opensea"
                InputLabelProps={{
                  classes: {
                    root: classes.root,
                  },
                }}
              />
            </Box>
          </Box>

          <Box mb={2}>
            <Typography>NFT Symbol</Typography>
            <TextField
              variant="outlined"
              value={nftBondSymbol}
              onChange={(e) => setNftBondSymbol(e.target.value)}
            />
          </Box>
        </Box>
        <Box mt={2}>
          <Box mb={2}>
            <Typography variant="h6" fontWeight="600">
              Artist Information
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography>Spotify Artist ID</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your Spotify Artist ID"
              className={classes.root}
              value={spotifyId}
              onChange={(e) => setSpotifyId(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography>Youtube Channel URL</Typography>
            <TextField
              variant="outlined"
              color="primary"
              placeholder="Enter your Youtube Channel URL"
              style={{ width: "40%" }}
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
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
                    style={{ width: "25%" }}
                    value={enteredCollateralAmount}
                    onChange={onCollateralAmountChange}
                  />
                  <Box display="inline" ml={2}>
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
                        ({latestSelectedCurrencyPrice} USD)
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box mb={2} style={{ width: "80%" }}>
                <Typography>Select Term</Typography>
                <Box mt={4}>
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
              <Box mb={2}>
                <Typography>Face Value</Typography>
                <TextField
                  variant="outlined"
                  color="primary"
                  placeholder="Enter USD face value of bond"
                  type="number"
                  onChange={onBondValueChange}
                  value={bondValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box mb={2} style={{ width: "80%" }}>
                <Typography>Individual Bond Value</Typography>
                <Box mt={4}>
                  <Slider
                    valueLabelDisplay="on"
                    min={1}
                    max={50}
                    step={1}
                    defaultValue={1}
                    onChangeCommitted={(e, val) => {
                      setNoOfSplits(val as number);
                      setSelectedSplitValue(
                        splitSliderData[(val as number) - 1].label as number
                      );
                    }}
                  ></Slider>
                </Box>
              </Box>
            </Box>
            <Box flexBasis="50%">
              <Box>
                <Typography>Value Summary</Typography>
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
                      {" " + supportedCurrencies[selectedCurrency].currency}
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
                      Fave Value
                    </Typography>
                    <Typography color="black">${bondValue}</Typography>
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
                    <Typography color="black">${selectedSplitValue}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" p={1}>
                    <Typography fontWeight="bold" color="black">
                      No of Bond Segmants
                    </Typography>
                    <Typography color="black">{pieData.length}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                style={{ width: "70%" }}
              >
                {pieData.length > 0 && (
                  <AccumulationChartComponent
                    id="pie-chart"
                    legendSettings={{ visible: false }}
                    enableSmartLabels={true}
                    enableAnimation={true}
                    center={{ x: "50%", y: "50%" }}
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
        </Box>
      </Box>
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
    </Box>
  );
};

export default BondInfoForm;
