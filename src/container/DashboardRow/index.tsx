import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../hooks/useAuth";
import { NotesInfo } from "../../state";

export interface NFTData {
  name: string;
  symbol: string;
  tokenUri: string;
  nftAddress: string;
}

const imageRatingMapping = {
  AAA: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-01.png",
  AA: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-02.png",
  A: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-03.png",
  III: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-04.png",
  II: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-05.png",
  I: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-06.png",
  UUU: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-07.png",
  UU: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-08.png",
  U: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-09.png",
  R: "https://gateway.pinata.cloud/ipfs/QmQZU7zwiGEQaimZDgogvZx1FHK1kzGrAEfeB4Ttg4qKQP/NusicFractal-10.png",
} as any;

const getImageByRating = (rating: string): string => {
  return imageRatingMapping[rating];
};

const DashboardRow = (props: { bond: NotesInfo; index: number }) => {
  const { bond, index } = props;
  const { account, library } = useWeb3React();
  const { login } = useAuth();

  return (
    <>
      <Box m={2} display="flex" alignItems="center">
        {/* <Box>
          {rating ? (
            <img src={getImageByRating(rating)} alt="nft" height="250px" />
          ) : (
            <Typography color="gray" width="250px" align="center">
              Rating not available
            </Typography>
          )}
        </Box> */}
        <Card>
          <CardContent>
            <Typography variant="h6">Notes - {bond.name}</Typography>
          </CardContent>
          <CardContent>
            <Box>
              <Grid container rowSpacing={2}>
                <Grid item xs={6}>
                  Artist
                </Grid>
                <Grid item xs={6}>
                  {bond.artistName}
                </Grid>
                <Grid item xs={6}>
                  NFT Symbol
                </Grid>
                <Grid item xs={6}>
                  {bond.symbol}
                </Grid>
                <Grid item xs={6}>
                  Face Value
                </Grid>
                <Grid item xs={6}>
                  {bond.price} USDC
                </Grid>
                {/* <Grid item xs={6}>
                  Promotion 1
                </Grid>
                <Grid item xs={6}>
                  {bond.promoOnePrice} USDC
                </Grid>
                <Grid item xs={6}>
                  Promotion 2
                </Grid>
                <Grid item xs={6}>
                  {bond.promoTwoPrice} USDC
                </Grid> */}
              </Grid>
            </Box>
          </CardContent>
          <CardActions>
            <Button variant="contained">Withdraw</Button>
            <Button color="info" variant="outlined">
              Activate Promotion 1
            </Button>
            <Button color="info" variant="outlined">
              Activate Promotion 2
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default DashboardRow;
