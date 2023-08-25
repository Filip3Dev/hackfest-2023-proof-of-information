import React from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import CloseIcon from "@mui/icons-material/Close";

const Connect = ({ isSignedIn, wallet }) => {
  const theme = useTheme();

  const signIn = async () => {
    await wallet.signIn();
  };

  const signOut = () => {
    wallet.signOut();
  };

  return (
    <Box sx={{ paddingTop: "5px" }}>
      {isSignedIn ? (
        <Box>
          <Button
            sx={{
              width: "180px",
              backgroundColor: "white",
              borderRadius: "10px",
              opacity: 1,
              height: "40px",
              color: "#004aad",
              fontFamily: theme.typography.fontFamily,
              fontSize: "18px",
              fontWeight: "700",
              textTransform: "none",
            }}
            onClick={() => signOut()}
          >
            Disconnect
            <CloseIcon
              sx={{ fontSize: "20px", color: "#004aad", marginLeft: "20px" }}
            />
          </Button>
        </Box>
      ) : (
        <Box>
          <Button
            sx={{
              width: "180px",
              backgroundColor: "white",
              borderRadius: "10px",
              opacity: 1,
              height: "40px",
              color: "#004aad",
              fontFamily: theme.typography.fontFamily,
              fontSize: "18px",
              fontWeight: "700",
              textTransform: "none",
            }}
            onClick={() => signIn()}
          >
            Connect
            <WalletIcon
              sx={{ color: "#004aad", fontSize: "20px", marginLeft: "20px" }}
            />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Connect;
