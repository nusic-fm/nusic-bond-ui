import {
  Box,
  makeStyles,
  Mark,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  IAccLoadedEventArgs,
  AccumulationTheme,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export const BondCreator = () => {
  const classes = useStyles();
  const [minBondSplit, setMinBondSplit] = useState(3000);
  const [bondValue, setBondValue] = useState(15000);
  const [splitSliderData, setSplitSliderData] = useState<Mark[]>([]);
  const [selectedSplitValue, setSelectedSplitValue] = useState(3000);
  const [pieData, setPieData] = useState<Mark[]>([]);

  const onBondValueChange = (e: any) => {
    const enteredValue = parseInt(e.target.value);
    setMinBondSplit(enteredValue / 50);
    setBondValue(enteredValue);
    const marks = new Array(50).fill("-").map((val, i) => ({
      value: i + 1,
      label: `${Math.floor(enteredValue / (i + 1))}`,
      noOfSlice: i + 1,
    }));
    setSplitSliderData(marks);
  };

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
  }, [selectedSplitValue]);

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      flexDirection="column"
      alignItems="center"
      className={classes.root}
      mt={8}
    >
      <Box>
        <Typography>What is your Spotify Artist ID?</Typography>
        <TextField id="outlined-basic" label="" variant="outlined" />
      </Box>
      <Box>
        <Typography>What is the URL of your Youtube channel?</Typography>
        <TextField id="outlined-basic" label="" variant="outlined" fullWidth />
      </Box>
      <Box>
        <Typography>Collateral deposit for Q1 Year 0 ?</Typography>
        <TextField id="outlined-basic" label="" variant="outlined" />
      </Box>
      <Box>
        <Typography>Choose term and check face value:</Typography>
        <Slider
          defaultValue={3}
          aria-label="Default"
          valueLabelDisplay="auto"
          min={1}
          max={6}
        ></Slider>
      </Box>
      <Box>
        <Typography>Bond Face Value: </Typography>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          value={bondValue}
          type="number"
          onChange={onBondValueChange}
        />
      </Box>
      <Box>
        <Typography align="center">Individual value</Typography>
        <Slider
          // style={{ width: "700px" }}
          valueLabelDisplay="on"
          min={1}
          max={50}
          // marks={splitSliderData}
          step={1}
          defaultValue={1}
          // getAriaValueText={(val, ind) => {
          //   console.log({ val });
          //   const res = splitSliderData.filter((mark) => val === mark.value)[0];
          //   if (res) {
          //     return `${res.label}`;
          //   }
          //   return `${splitSliderData[0]?.label}`;
          // }}
          onChangeCommitted={(e, val) => {
            setSelectedSplitValue(
              splitSliderData[(val as number) - 1].label as number
            );
          }}
        ></Slider>
      </Box>
      <Box>
        <AccumulationChartComponent
          id="pie-chart"
          title="Bond split up"
          legendSettings={{ visible: false }}
          enableSmartLabels={true}
          enableAnimation={true}
          center={{ x: "50%", y: "50%" }}
          tooltip={{ enable: false }}
          // highlightPattern="Bubble"
          // highLightMode="Point"
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
      </Box>
    </Box>
  );
};
