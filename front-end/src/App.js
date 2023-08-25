import { Box } from "@mui/material";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ProofCreation from "./components/ProofCreation";

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
  return (
    <>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <Box className="App" sx={{ minHeight: "100vh" }}>
            <BrowserRouter>
              <Header isSignedIn={isSignedIn} wallet={wallet} />
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProofCreation isSignedIn={isSignedIn} wallet={wallet} />
                  }
                />
                <Route
                  path="/scoring"
                  element={
                    <ProofCreation isSignedIn={isSignedIn} wallet={wallet} />
                  }
                >
                  <Route
                    path=":redirectParam"
                    element={
                      <ProofCreation isSignedIn={isSignedIn} wallet={wallet} />
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </Box>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
}

export default Main;
