import { Box, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Connect from "../../shared/Connect";

const Header = ({ isSignedIn, wallet }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        fontFamily: "Open Sans",
        height: { xs: "60px", lg: "80px" },
        backgroundColor: "#004aad",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "center", lg: "space-between" },
        justifyContent: { xs: "center", lg: "space-between" },
        paddingLeft: "100px",
        paddingRight: "100px",
        boxShadow: "0 3px 3px rgb(0 0 0 / 10%)",
      }}
    >
      <img src="TD.png" class="header-logo" />

      <Connect isSignedIn={isSignedIn} wallet={wallet} />
    </Box>
  );
};

export default Header;
