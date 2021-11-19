import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const ApVerificationDialog = (props: any) => {
  const { open, onClose, verifyAddress } = props;
  const [assetPoolAddress, setAssetPoolAddress] = useState<string>();

  const handleClose = () => {
    onClose();
  };

  const onVerifyClick = () => {
    verifyAddress(assetPoolAddress);
  };

  const onAssetpoolAdressChange = (e: any) => {
    setAssetPoolAddress(e.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Verify your Assetpool</DialogTitle>
      <Box m={2}>
        <TextField
          placeholder="Assetpool address"
          value={assetPoolAddress}
          onChange={onAssetpoolAdressChange}
          variant="standard"
        />
        <Button onClick={onVerifyClick} variant="contained">
          Verify
        </Button>
      </Box>
    </Dialog>
  );
};

ApVerificationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  verifyAddress: PropTypes.func.isRequired,
};

export default ApVerificationDialog;
