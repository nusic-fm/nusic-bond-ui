import { MenuItem, MenuList } from "@mui/material";
import { Box } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import ForumIcon from "@mui/icons-material/Forum";

const Organization = () => {
  return (
    <Box position="absolute" bottom="0px" left="0px">
      <MenuList>
        <MenuItem>
          <GitHubIcon
            onClick={() => window.open("https://github.com/nusic-fm", "_blank")}
          />
        </MenuItem>
        <MenuItem>
          <ForumIcon
            onClick={() =>
              window.open(
                "https://discord.com/channels/826044814138409011",
                "_blank"
              )
            }
          />
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default Organization;
