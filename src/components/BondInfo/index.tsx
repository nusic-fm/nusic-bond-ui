import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Props = { goToNextPage: () => void };

const BondInfo = ({ goToNextPage }: Props) => {
  const [enteredCollateralAmount, setEnteredCollateralAmount] =
    useState<number>();
  const [bondValue, setBondValue] = useState(1);
  const [selectedTerm, setSelectedTerm] = useState(3);
  const onCollateralAmountChange = (e: any) => {
    const collateral = parseFloat(e.target.value);
    setEnteredCollateralAmount(collateral);
  };
  const onBondValueChange = (e: any) => {
    const enteredValue = parseInt(e.target.value);
    setBondValue(enteredValue);
  };
  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={8}>
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
              </Box>
            </Box>
            <Box mt={2}>
              <Button variant="outlined" color="info" onClick={goToNextPage}>
                Next
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
