import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useState } from "react";

type Props = { goToNextPage: () => void };

const IssueBond = ({ goToNextPage }: Props) => {
  const [processMode, setProcessMode] = useState(0);
  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={8}>
            <Box mt={8} display="flex">
              <Stepper activeStep={processMode - 1} orientation="vertical">
                <Step>
                  <StepLabel>
                    <Box display="flex" alignItems="center" fontSize="24px">
                      Issuing NFT Bond
                      <Box ml={3}>
                        {processMode === 1 && (
                          <CircularProgress color="info" size={20} />
                        )}
                      </Box>
                    </Box>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    <Box display="flex" alignItems="center" fontSize="24px">
                      Minting your NFT music Bond
                      <Box ml={3}>
                        {processMode === 2 && (
                          <CircularProgress color="info" size={20} />
                        )}
                      </Box>
                    </Box>
                  </StepLabel>
                </Step>
              </Stepper>
            </Box>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default IssueBond;
