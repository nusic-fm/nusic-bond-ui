import { Button, Table, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useAssetPool, { ApData } from "../../hooks/useAssetPool";
import useAuth from "../../hooks/useAuth";
import { useApManager } from "../../hooks/useManager";
import useNftBond from "../../hooks/useNftBond";
import { useRating } from "../../hooks/useRating";
import { AssetPoolInfo } from "../../state";

export interface NFTData {
  name: string;
  symbol: string;
  tokenUri: string;
  nftAddress: string;
}

const imageRatingMapping = {
  AAA: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-01.png",
  AA: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-02.png",
  A: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-03.png",
  III: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-04.png",
  II: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-05.png",
  I: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-06.png",
  UUU: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-07.png",
  UU: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-08.png",
  U: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-09.png",
  R: "https://ipfs.io/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-10.png",
} as any;

const getImageByRating = (rating: string): string => {
  return imageRatingMapping[rating];
};

const DashboardRow = (props: {
  bond: Partial<AssetPoolInfo>;
  index: number;
}) => {
  const { bond, index } = props;
  const { account, library } = useWeb3React();
  const { login } = useAuth();
  const { getNFTData } = useNftBond();
  const { getApBalance, getApData } = useAssetPool();
  const { getAssetpoolsOfUserByIndex } = useApManager();
  const { getRating } = useRating();

  const [nftBond, setNftBond] = useState<NFTData>();
  const [apAddress, setApAddress] = useState<string>();
  const [assetPoolBalance, setAssetPoolBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<string>();
  const [apData, setApData] = useState<ApData>();
  // const [nftArt, setNftArt] = useState<string>();

  useEffect(() => {
    if (bond) {
      fetchNftInfo(bond);
    }
  }, [bond]);

  const fetchNftInfo = async (bond: Partial<AssetPoolInfo>) => {
    const nftAddress = bond.nftAddress;
    if (nftAddress) {
      const data = await getNFTData(nftAddress);
      if (data) {
        setNftBond(data);
        // if (data.tokenUri) {
        //   try {
        //     const json = await axios.get(data.tokenUri);
        //     if (json.data) {
        //       setNftArt(json.data.image);
        //     }
        //   } catch (e) {
        //     console.error(e);
        //   }
        // }
      }
      const _apAddress = await getAssetpoolsOfUserByIndex(index);
      if (_apAddress) {
        setApAddress(_apAddress);
        try {
          const _rating = await getRating(_apAddress);
          setRating(_rating);
        } catch (e) {
          console.error(e);
        }
        try {
          const balance = await getApBalance(_apAddress);
          setAssetPoolBalance(balance);
        } catch (e) {
          console.error(e);
        }
        try {
          const apData = await getApData(_apAddress);
          setApData(apData);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const onDepositClick = async () => {
    if (account && apAddress && bond.collateralAmount) {
      const signer = library.getSigner();
      const tx = {
        from: account,
        to: apAddress,
        value: ethers.utils.parseEther(bond.collateralAmount.toString()),
      };
      console.dir(tx);
      try {
        const ftx = await signer.sendTransaction(tx);
        setIsLoading(true);
        const receipt = await ftx.wait();
        setIsLoading(false);
        console.log({ transfer: receipt });
      } catch (error) {
        alert("failed to send!!");
      }
    } else {
      login();
    }
  };

  return (
    <>
      <Box m={2} display="flex" alignItems="center">
        <Box>
          {rating ? (
            <img src={getImageByRating(rating)} alt="nft" height="250px" />
          ) : (
            <Typography color="gray" width="250px" align="center">
              Rating not available
            </Typography>
          )}
        </Box>
        <Box
          ml={8}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "6px",
          }}
          flexGrow={1}
        >
          <Table>
            <TableRow>
              <TableCell>
                <Box p={1} mr={8}>
                  <Typography fontWeight="600" pb={1}>
                    Asset Name
                  </Typography>
                  <Typography>{nftBond?.name || "-"}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1} mr={8}>
                  <Typography fontWeight="600" pb={1}>
                    Face Value
                  </Typography>
                  <Typography>
                    ETH{" "}
                    {bond?.faceValue
                      ? ethers.utils.formatEther(bond.faceValue)
                      : "-"}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1} mr={8}>
                  <Typography fontWeight="600" pb={1}>
                    Average Quarter
                  </Typography>
                  <Typography>
                    ETH{" "}
                    {bond?.collateralAmount
                      ? ethers.utils.formatEther(bond.collateralAmount)
                      : "-"}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Rating
                  </Typography>
                  <Typography>{rating}</Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Symbol
                  </Typography>
                  <Typography>{nftBond?.symbol}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Term
                  </Typography>
                  <Typography>{bond?.termInYears + " years" || "-"}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Asset Pool
                  </Typography>
                  <Typography>ETH {assetPoolBalance}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Outstanding
                  </Typography>
                  <Typography>-</Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Coupon
                  </Typography>
                  <Typography>6.25%</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Yield Maximizer
                  </Typography>
                  <Typography>-</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    $NUSIC APY
                  </Typography>
                  <Typography>-</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Next Deposit
                  </Typography>
                  <Typography>
                    {bond?.collateralAmount
                      ? ethers.utils.formatEther(bond.collateralAmount)
                      : "-"}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </Table>
        </Box>
      </Box>
      <Box
        m={2}
        mt={4}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "6px",
        }}
        display="flex"
        p={1}
      >
        <Table>
          <TableRow>
            <TableCell>
              <Box>
                <Typography>Next Deposit Amount</Typography>
                <Typography fontWeight="600">
                  ETH{" "}
                  {bond?.collateralAmount
                    ? ethers.utils.formatEther(bond.collateralAmount)
                    : "-"}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box>
                <Typography>Due in</Typography>
                <Typography fontWeight="600">
                  {apData?.expectedNextPaymentBlock} Blocks
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box>
                <Typography>Coupon Rate</Typography>
                <Typography fontWeight="600">6.25%</Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  onClick={onDepositClick}
                >
                  Deposit Now
                </Button>
              </Box>
            </TableCell>
            <TableCell>
              <Box>
                <Button color="secondary">Boost Rating</Button>
              </Box>
            </TableCell>
          </TableRow>
        </Table>
      </Box>
    </>
  );
};

export default DashboardRow;
