import { Stack, Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { nftInfoState, songStreamingInfoState } from "../../state";

type Props = {
  goToNextPage: () => void;
};

const ArtistInfo = ({ goToNextPage }: Props) => {
  // const [preview, setPreview] = useState<string>();
  // const [artistName, setArtistName] = useState<string>("");
  const [_songStreamingInfo] = useRecoilState(songStreamingInfoState);
  const [nftBondName, setNftBondName] = useState<string>("");
  const [nftBondSymbol, setNftBondSymbol] = useState<string>("");
  const setNftInfo = useSetRecoilState(nftInfoState);

  useEffect(() => {
    if (_songStreamingInfo?.songTitle) {
      setNftBondName(_songStreamingInfo?.songTitle);
      const spaceSplits = _songStreamingInfo?.songTitle.split(" ");
      if (spaceSplits.length > 1) {
        setNftBondSymbol(
          spaceSplits
            .map((a) => a[0])
            .join("")
            .toUpperCase()
        );
      } else {
        setNftBondSymbol(
          _songStreamingInfo?.songTitle.slice(0, 3).toUpperCase()
        );
      }
    }
  }, [_songStreamingInfo]);

  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={8}>
            <Box mt={2}>
              <Box mb={2}>
                <Typography variant="h6" fontWeight="600">
                  Notes Issuer
                </Typography>
              </Box>
              <Box mb={2} display="flex" alignItems={"center"}>
                <Box flexBasis="50%">
                  <Typography>Name</Typography>
                  <TextField
                    variant="outlined"
                    value={_songStreamingInfo?.artistName}
                    disabled
                    placeholder="autofill"
                  />
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Box mb={2}>
                <Typography variant="h6" fontWeight="600">
                  NFT Information
                </Typography>
              </Box>
              <Box mb={2} display="flex">
                <Box flexBasis="50%" display="flex">
                  {_songStreamingInfo?.songImageUrl && (
                    <Box mr={2}>
                      <img
                        src={_songStreamingInfo?.songImageUrl}
                        alt="prev"
                        width={100}
                        height={100}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    </Box>
                  )}
                  <Box>
                    <Typography>NFT Name</Typography>
                    <TextField
                      variant="outlined"
                      value={nftBondName}
                      onChange={(e) => setNftBondName(e.target.value)}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography>NFT Symbol</Typography>
                  <TextField
                    variant="outlined"
                    value={nftBondSymbol}
                    onChange={(e) => setNftBondSymbol(e.target.value)}
                  />
                </Box>
                {/* <Box>
                  {selectedFile ? (
                    <img
                      src={preview}
                      alt="prev"
                      width={100}
                      height={100}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      component="label"
                      onChange={(e: any) => {
                        if (e.target.files.length === 0) return;
                        const file = e.target.files[0];
                        setSelectedFile(file);
                        setPreview(URL.createObjectURL(file));
                      }}
                    >
                      Upload Picture
                      <input hidden accept="image/*" type="file" />
                    </Button>
                  )}
                </Box> */}
              </Box>
            </Box>
            <Box mt={2}>
              <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  setNftInfo({
                    nftName: nftBondName,
                    nftSymbol: nftBondSymbol,
                  });
                  goToNextPage();
                }}
              >
                Continue to Financials
              </Button>
            </Box>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default ArtistInfo;
