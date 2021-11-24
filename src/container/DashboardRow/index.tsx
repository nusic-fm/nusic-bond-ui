import { Button, Table, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useAssetPool from "../../hooks/useAssetPool";
import useNftBond from "../../hooks/useNftBond";
import { AssetPoolInfo } from "../../state";

export interface NFTData {
  name: string;
  symbol: string;
  tokenUri: string;
}

const DashboardRow = (props: { bond: Partial<AssetPoolInfo> }) => {
  const { bond } = props;
  const { getNFTData } = useNftBond();
  const { getApBalance } = useAssetPool();
  const [nftBond, setNftBond] = useState<NFTData>();
  const [assetPoolBalance, setAssetPoolBalance] = useState<number>(0);

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
      }
      const balance = await getApBalance(bond.apAddress as string);
      if (balance) {
        setAssetPoolBalance(balance);
      }
    }
  };

  return (
    <>
      <Box m={2} display="flex" alignItems="center">
        <Box>
          <img
            src="https://ipfs.io/ipfs/QmaJ5oKx9QzeFxaJLiuTKzsfRoaujjRd7n3ux6zKXxTkci/Nusic%20Bond%20Fractals/NusicFractal-01.svg"
            alt="nft"
            height="250px"
          />
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
                  <Typography>${bond?.faceValue || "-"}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1} mr={8}>
                  <Typography fontWeight="600" pb={1}>
                    Average Quarter
                  </Typography>
                  <Typography>{bond?.individualBondValue || "-"}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Rating
                  </Typography>
                  <Typography>-</Typography>
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
                  <Typography>-</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box p={1}>
                  <Typography fontWeight="600" pb={1}>
                    Yeild Maximizer
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
                  <Typography>-</Typography>
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
                <Typography fontWeight="600">ETH -</Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box>
                <Typography>Due in</Typography>
                <Typography fontWeight="600">-</Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box>
                <Typography>Coupon Rate</Typography>
                <Typography fontWeight="600">%</Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box>
                <Button variant="contained" color="primary">
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
