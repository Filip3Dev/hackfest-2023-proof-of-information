import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import ProofCreation from "./components/ProofCreation";
import ProofVerification from "./components/ProofVerification";
import React from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  colors: {
    color1: "#23B7EF",
    color2: "#97A8BC",
    color3: "#1FBDD9",
    color4: "#0D1921",
    color5: "#030B10",
    color6: "#6D8198",
    color7: "#5185AA",
    btn: "#009FDB",
    light1: "white",
    light2: "#e6f2ff",
    dark1: "#004d99",
    dark2: "#030B10",
  },
});

function Main({ isSignedIn, wallet }) {
  const [nav, setNav] = useState(1);

  return (
    <>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <Box className="App" sx={{ minHeight: "100vh" }}>
            <Header isSignedIn={isSignedIn} wallet={wallet} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: theme.typography.typography,
                  fontSize: "25px",
                  fontWeight: "600",
                  backgroundColor: "#004aad",
                  width: "130px",
                  py: "10px",
                  color: nav == 1 ? "white" : "black",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  cursor: "pointer",
                }}
                align={"center"}
                onClick={() => setNav(1)}
              >
                Create
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: theme.typography.typography,
                  fontSize: "25px",
                  fontWeight: "600",
                  backgroundColor: "#004aad",
                  width: "130px",
                  py: "10px",
                  color: nav == 2 ? "white" : "black",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  cursor: "pointer",
                }}
                align={"center"}
                onClick={() => setNav(2)}
              >
                Verify
              </Typography>
            </Box>
            {nav == 1 ? (
              <ProofCreation isSignedIn={isSignedIn} wallet={wallet} />
            ) : (
              <ProofVerification />
            )}
          </Box>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
}

export default Main;
