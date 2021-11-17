import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Slider,
  Mark,
  Button,
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

const BondInfoForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedTerm, setSelectedTerm] = useState(3);
  const [bondValue, setBondValue] = useState(15000);
  const [splitSliderData, setSplitSliderData] = useState<Mark[]>([]);
  const [selectedSplitValue, setSelectedSplitValue] = useState(15000);
  const [pieData, setPieData] = useState<Mark[]>([]);

  const onBondValueChange = (e: any) => {
    const enteredValue = parseInt(e.target.value);
    setBondValue(enteredValue);
  };

  const onClickToDeposit = () => {
    history.push("/home/mint/opensea/deposit");
  };

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
      <Box display="flex" mt={3}>
        <Box
          display="flex"
          flexDirection="column"
          borderRight="1px solid white"
          flexBasis="50%"
          pl={10}
          pr={10}
        >
          <Box mb={2}>
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
          <Box mb={2}>
            <Typography>Spotify Artist ID</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your Spotify Artist ID"
              className={classes.root}
            />
          </Box>
          <Box mb={2}>
            <Typography>Youtube Channel URL</Typography>
            <TextField
              variant="outlined"
              color="primary"
              placeholder="Enter your Youtube Channel URL"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <Typography>Collateral Deposit for Q1 Year 0</Typography>
            <Box>
              <TextField
                variant="outlined"
                color="primary"
                placeholder="Enter collateral deposit amount"
                type="number"
              />
              <Box display="inline" ml={2}>
                <Select
                  value={0}
                  // onChange={handleChange}
                >
                  <MenuItem value={0}>DAI</MenuItem>
                  <MenuItem value={1}>ETH</MenuItem>
                  <MenuItem value={2}>UST</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography>Select Term</Typography>
            <Box display="inline" pl={6} pr={6}>
              <Slider
                min={1}
                max={5}
                step={1}
                defaultValue={3}
                onChangeCommitted={(e, value) => {
                  setSelectedTerm(value as number);
                }}
                valueLabelDisplay="auto"
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
            />
          </Box>
          <Box mb={2}>
            <Typography>Individual Bond Value</Typography>
            <Slider
              valueLabelDisplay="on"
              min={1}
              max={50}
              step={1}
              defaultValue={1}
              onChangeCommitted={(e, val) => {
                setSelectedSplitValue(
                  splitSliderData[(val as number) - 1].label as number
                );
              }}
            ></Slider>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flexBasis="50%"
          pl={10}
          pr={10}
        >
          <Box>
            <Typography>Value Summary</Typography>
            <Box className={classes.summary} mt={1}>
              <Box display="flex" justifyContent="space-between" p={1} pb={0}>
                <Typography fontWeight="bold" color="black">
                  Collateral Deposit
                </Typography>
                <Typography color="black">4000 DAI</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" p={1} pb={0}>
                <Typography fontWeight="bold" color="black">
                  Term
                </Typography>
                <Typography color="black">{selectedTerm} year(s)</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" p={1} pb={0}>
                <Typography fontWeight="bold" color="black">
                  Fave Value
                </Typography>
                <Typography color="black">${bondValue}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" p={1} pb={0}>
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
          <Box>
            <Button
              variant="contained"
              color="primary"
              style={{ float: "right" }}
              onClick={onClickToDeposit}
            >
              Continue to Deposit Collateral
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BondInfoForm;
