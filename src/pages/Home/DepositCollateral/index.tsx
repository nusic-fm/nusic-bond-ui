import {
  Button,
  Chip,
  CircularProgress,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import ApVerificationDialog from "../../../components/AssetPoolVerificationDialog";
import Footer from "../../../components/Footer";
import useAuth from "../../../hooks/useAuth";
import { useApManager } from "../../../hooks/useManager";
import { AssetPoolInfo, pendingAssetPoolInfo } from "../../../state";
import { supportedCurrencies } from "../BondInfoForm";
import { abi as AssetPoolAbi } from "../../../abis/AssetPool.json";

const DepositCollateral = () => {
  const { account, library } = useWeb3React();
  const { login } = useAuth();
  const history = useHistory();
  const { createAssetPool, checkPendingAssetPool } = useApManager();

  const [_pendingAssetPoolInfo, setPoolInfo] =
    useRecoilState(pendingAssetPoolInfo);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isVerifyOpen, setIsVerifyOpen] = useState<boolean>(false);
  const [apAddress, setApAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const depositCollateral = async (amount: string) => {
    if (!account) {
      alert("Kindly connect your wallet!");
      return;
    }
    if (!apAddress) {
      alert("Something's wrong, please try again later");
      return;
    }
    const contract = new ethers.Contract(
      apAddress,
      AssetPoolAbi,
      library.getSigner()
    );
    const tx = await contract.depositFunds(amount);
    alert("Successfully Deposited");
    return tx;
  };

  const onDepositClick = async () => {
    if (account && apAddress && _pendingAssetPoolInfo) {
      // await ethers.ma
      const signer = library.getSigner();
      // const tx = {
      //   from: account,
      //   to: apAddress,
      //   value: ethers.utils.parseEther(
      //     _pendingAssetPoolInfo.collateralAmount.toString()
      //   ),
      // };
      // console.dir(tx);
      try {
        // const ftx = await signer.sendTransaction(tx);

        setIsLoading(true);
        const apprvalContract = await new ethers.Contract(
          "0xeeB5276300CcC8B5cAF6a0108566815fbaAd35f8",
          [
            "function approve(address _spender, uint256 _value) public returns (bool success)",
          ],
          library.getSigner()
        );
        const tx = await apprvalContract.approve(apAddress, "1000000");
        await tx.wait();
        const receipt = await depositCollateral("1000000");
        console.log({ transfer: receipt.hash });
        const poolInfo: AssetPoolInfo = {
          ..._pendingAssetPoolInfo,
          isCollateralDeposited: true,
          apAddress,
        };
        setPoolInfo(poolInfo);
        setIsLoading(false);
        history.push("/home/mint/opensea/issue-bond");
      } catch (error) {
        setIsLoading(false);
        alert("failed to send!!");
      }
    } else {
      login();
    }
  };
  const onCreateButtonClick = async () => {
    if (_pendingAssetPoolInfo?.faceValue) {
      try {
        const tx = await createAssetPool(_pendingAssetPoolInfo.faceValue);
        setIsLoading(true);
        const receipt = await tx.wait();
        console.log({ receipt });
        let apAddressFromTx = receipt.events.filter(
          (args: any) => args.event === "AssetPoolCreated"
        )[0].args.assetPool;
        const poolInfo: AssetPoolInfo = {
          ..._pendingAssetPoolInfo,
          apAddress: apAddressFromTx,
        };
        setPoolInfo(poolInfo);
        setApAddress(apAddressFromTx);
        setActiveStep(1);
        setIsLoading(false);
        // TODO
      } catch (e) {
        console.log({ e });
      }
    }
  };
  const onSkipClick = () => {
    setIsVerifyOpen(true);
    // TODO remove
    setActiveStep(1);
  };
  const onAssetAddressVerify = async (address: string) => {
    const isAvailable = await checkPendingAssetPool(address);
    if (isAvailable) {
      setApAddress(address);
      setIsVerifyOpen(false);
      setActiveStep(1);
    }
  };
  const onVerifyDialogClose = () => {
    setIsVerifyOpen(false);
  };

  const onContinueToSummary = async () => {
    history.push("/home/mint/opensea/issue-bond");
  };

  return (
    <Box pt={4}>
      <Typography variant="h4" fontWeight="600" align="center">
        Create Assetpool &#38; Deposit Collateral
      </Typography>
      <Typography variant="h4" fontWeight="600" align="center"></Typography>
      <Box display="flex" justifyContent="center" mt={4}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              Create Assetpool{" "}
              {apAddress && (
                <Chip color="success" variant="outlined" label={apAddress} />
              )}{" "}
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <Box>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={onCreateButtonClick}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Create
                      </Button>
                      <ApVerificationDialog
                        open={isVerifyOpen}
                        onClose={onVerifyDialogClose}
                        verifyAddress={onAssetAddressVerify}
                      />
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        onClick={onSkipClick}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Skip
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Deposit Collateral</StepLabel>
            <StepContent>
              <Box display="flex" justifyContent="center" m={4}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{ backgroundColor: "white", borderRadius: 4 }}
                  p={2}
                >
                  <Box>
                    <Typography color="black" fontWeight="600">
                      Collateral Deposit
                    </Typography>
                    <Typography color="black" variant="caption">
                      for Q1 year 0
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color="black" ml={10}>
                      {_pendingAssetPoolInfo?.collateralAmount || "--"}
                      {" " +
                        supportedCurrencies[
                          _pendingAssetPoolInfo?.currencyId || 0
                        ].currency}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box mt={6} display="flex" justifyContent="center">
                <Box>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onDepositClick}
                    >
                      {account ? "Deposit collateral" : "Connect Wallet"}
                    </Button>
                  )}
                </Box>
              </Box>
              {account && (
                <Typography
                  mt={1}
                  align="center"
                  fontStyle="italic"
                  style={{ opacity: "0.8" }}
                >
                  Wallet Connected
                </Typography>
              )}
            </StepContent>
          </Step>
        </Stepper>
      </Box>
      <Footer>
        <Button
          variant="contained"
          color="primary"
          onClick={onContinueToSummary}
          disabled={isLoading}
        >
          Continue to Summary
        </Button>
      </Footer>
    </Box>
  );
};

export default DepositCollateral;
