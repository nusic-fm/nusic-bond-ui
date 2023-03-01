import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import DashboardRow from "../../container/DashboardRow";
import { useApManager } from "../../hooks/useManager";
import useNftBond from "../../hooks/useNftBond";
import { NotesInfo } from "../../state";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#17172F",
    minHeight: "calc(100vh - 65px)",
    width: "100%",
  },
});
const Dashboard = () => {
  const classes = useStyles();
  const [bonds, setBonds] = useState<NotesInfo[]>();
  const { getBondConfigs } = useApManager();
  const { getNFTData } = useNftBond();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      fetchUserBondConfigs();
    }
  }, [account]);
  const fetchUserBondConfigs = async () => {
    try {
      const configs = await getBondConfigs();
      if (configs.length) {
        // const _bonds: Partial<AssetPoolInfo>[] = configs.map((config: any) => ({
        //   artistName: config.artistName,
        //   spotifyId: config.artistId,
        //   faceValue: config.faceValue.toString(),
        //   collateralAmount: config.fundingAmount.toString(),
        //   termInYears: config.numberOfYears.toString(),
        //   nftAddress: config.nftAddress.toString(),
        // }));
        const _bond = await getNFTData(configs[configs.length - 1]);
        if (_bond) {
          setBonds([_bond]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Box className={classes.root} p={2} pl={20} pr={20}>
      <Typography variant="h5" fontWeight={400} m={2}>
        Dashboard
      </Typography>
      <Box pt={2}>
        <Box
          m={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>My NFT Notes</Typography>
          {/* <Typography>
            Available Reward{" "}
            <Chip clickable variant="outlined" label="8.6341 Claim" />
          </Typography> */}
        </Box>
        {bonds?.map((bond, i) => {
          return <DashboardRow key={i} index={i} bond={bond} />;
        })}
      </Box>
    </Box>
  );
};

export default Dashboard;
