import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AccumulationChartComponent,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  AccumulationDataLabel,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
} from "@syncfusion/ej2-react-charts";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { bondInfoState } from "../../state";

type Props = { goToNextPage: () => void };

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

const BondInfo = ({ goToNextPage }: Props) => {
  const [enteredCollateralAmount, setEnteredCollateralAmount] =
    useState<number>();
  const [bondValue, setBondValue] = useState(1);
  const [selectedTerm, setSelectedTerm] = useState(3);
  const [isInstantLiquidity, setIsInstantLiquidity] = useState(false);
  const [selectedSplitValue, setSelectedSplitValue] = useState(15000);
  const [noOfSplits, setNoOfSplits] = useState<number>(1);
  const [splitSliderData, setSplitSliderData] = useState<Mark[]>([]);
  const [pieData, setPieData] = useState<Mark[]>([]);

  const onCollateralAmountChange = (e: any) => {
    const collateral = parseFloat(e.target.value);
    setEnteredCollateralAmount(collateral);
  };
  const onBondValueChange = (e: any) => {
    const enteredValue = parseInt(e.target.value);
    setBondValue(enteredValue);
  };
  const setBondInfoState = useSetRecoilState(bondInfoState);

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

  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={8}>
            <Box mt={2}>
              <Box mb={2}>
                <Typography variant="h6" fontWeight="600">
                  Notes Financials
                </Typography>
              </Box>
              <Box width={"100%"}>
                <Box>
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
                                  setNoOfSplits(1);
                                  setSelectedSplitValue(
                                    parseFloat(
                                      splitSliderData[0].label as string
                                    )
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
                                splitSliderData[(val as number) - 1]
                                  .label as string
                              )
                            );
                          }}
                        ></Slider>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
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
              </Box>
            </Box>
            <Box mt={2}>
              <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  setBondInfoState({
                    faceValue: bondValue,
                    termYears: selectedTerm,
                    noOfBonds: noOfSplits,
                  });
                  goToNextPage();
                }}
              >
                Continue to Promotion
              </Button>
            </Box>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default BondInfo;
