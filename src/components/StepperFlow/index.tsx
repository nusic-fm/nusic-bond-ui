import {
  StepIconProps,
  StepConnector,
  stepConnectorClasses,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import CampaignIcon from "@mui/icons-material/Campaign";
import StreamIcon from "@mui/icons-material/Stream";
import HubRoundedIcon from "@mui/icons-material/HubRounded";

type Props = { currentStep: number };

const StepperFlow = ({ currentStep }: Props) => {
  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor: "rgba(255,255,255,0.07)",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));
  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <LibraryMusicRoundedIcon />,
      2: <InfoOutlined />,
      3: <LocalAtmRoundedIcon />,
      // 4: <CampaignIcon />,
      5: <StreamIcon />,
      6: <HubRoundedIcon />,
    };
    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      width: 0,
      height: 3,
      border: 0,
      backgroundColor: "grey",
      borderRadius: 1,
    },
  }));

  const steps = [
    "Select Song",
    "NFT Info",
    "Notes Financials & Promotion",
    // "Promotion",
    // "Deposit",
    "Issue Notes",
  ];

  return (
    <Box pt={4}>
      <Stepper
        // alternativeLabel
        activeStep={currentStep}
        connector={<ColorlibConnector />}
        orientation="vertical"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperFlow;
