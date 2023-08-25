import {
  Box,
  Container,
  Typography,
  TextField,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { fetchData } from "../../shared/utils/database";
import { SERVER } from "../../shared/Constants/constants";
import { LoadingButton } from "@mui/lab";
import { hexToString } from "../../shared/utils/stringhex";
import BigNumber from "bignumber.js";
import VerifiedIcon from "@mui/icons-material/Verified";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import ClearIcon from "@mui/icons-material/Clear";

const ProofVerification = () => {
  const [url, setUrl] = useState("");
  const [isVerified, setIsVerified] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const reset = () => {
    setUrl("");
    setIsVerified(null);
    setData(null);
  };

  const handleVerifyProof = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const content = await response.text();
      const proof = JSON.parse(content);
      let res = await fetchData(
        { proof: proof.proof, publicSignals: proof.publicSignals },
        SERVER + "merkletree/verify"
      );
      let proofData = proof.publicSignals;
      proofData[1] = parseInt(proofData[1], 10);
      setData(proofData);
      if (res) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsVerified(false);
    }
    setLoading(false);
  };

  const theme = useTheme();
  return (
    <Box
      sx={{
        paddingTop: "50px",
        backgroundColor: "white",
        marginBottom: "50px",
      }}
    >
      <Container
        sx={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          border: "8px solid #004aad",
        }}
      >
        <SettingsBackupRestoreIcon
          sx={{
            float: "right",
            color: "#004aad",
            fontSize: "40px",
          }}
          onClick={() => reset()}
        />
        <Typography
          variant="body2"
          sx={{
            fontFamily: theme.typography.typography,
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          Paste your Proof's url here and get the information!
        </Typography>
        <TextField
          sx={{
            input: {
              paddingLeft: "20px",
              color: "black",
              fontWeight: 500,
              height: "25px",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderRadius: "10px" },
              "&:hover fieldset": {
                borderColor: theme.colors.color3,
                color: "#E2EDFF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6F7E8C",
              },
            },
            width: "100%",
            marginTop: "25px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          InputLabelProps={{
            style: { color: "black", fontSize: "18px" },
          }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          label="Proof's url"
          variant="filled"
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            sx={{
              width: "100%",
              backgroundColor: theme.colors.btn,
              opacity: 1,
              marginTop: "20px",
              height: "60px",
              color: "#fff",
              fontFamily: theme.typography.fontFamily,
              fontSize: "20px",
              fontWeight: "600",
              textTransform: "none",
              width: "40%",
            }}
            onClick={handleVerifyProof}
            loading={loading}
          >
            Verify proof
          </LoadingButton>
        </Box>
        {isVerified ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <VerifiedIcon sx={{ color: "green", marginRight: "10px" }} />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: theme.typography.typography,
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "green",
                }}
              >
                Your proof is verified!
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <TableContainer
                component={Paper}
                sx={{ width: "60%", backgroundColor: "#DCDCDC" }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>
                        Field
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      key={"123"}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" scope="row">
                        Web2 ID
                      </TableCell>
                      <TableCell align="center">
                        {hexToString(data[1].toString(16))}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={"123"}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" scope="row">
                        Type
                      </TableCell>
                      {data[3] == "1" ? (
                        <TableCell align="center">Greater</TableCell>
                      ) : (
                        ""
                      )}
                      {data[3] == "2" ? (
                        <TableCell align="center">Less</TableCell>
                      ) : (
                        ""
                      )}
                      {data[3] == "3" &&
                      data[4] == "0" &&
                      data[5] == "100000000000000000000000000000000" ? (
                        <TableCell align="center">No Condition</TableCell>
                      ) : (
                        ""
                      )}
                      {data[3] == "3" &&
                      data[4] != "0" &&
                      data[5] != "100000000000000000000000000000000" ? (
                        <TableCell align="center">Range</TableCell>
                      ) : (
                        ""
                      )}
                    </TableRow>
                    {data[3] == "1" || data[3] == "2" ? (
                      <TableRow
                        key={"123"}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" scope="row">
                          Condition
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {new BigNumber(data[6])
                            .dividedBy(1000000000000000000000000)
                            .toFixed(2)}{" "}
                          NEAR
                        </TableCell>
                      </TableRow>
                    ) : (
                      ""
                    )}
                    {data[3] == "3" &&
                    data[4] == "0" &&
                    data[5] == "100000000000000000000000000000000" ? (
                      <TableRow
                        key={"123"}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" scope="row">
                          Balance
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {new BigNumber(data[0])
                            .dividedBy(1000000000000000000000000)
                            .toFixed(2)}{" "}
                          NEAR
                        </TableCell>
                      </TableRow>
                    ) : (
                      ""
                    )}
                    {data[3] == "3" &&
                    data[4] != "0" &&
                    data[5] != "100000000000000000000000000000000" ? (
                      <TableRow
                        key={"123"}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" scope="row">
                          Min
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {new BigNumber(data[4])
                            .dividedBy(1000000000000000000000000)
                            .toFixed(2)}{" "}
                          NEAR
                        </TableCell>
                      </TableRow>
                    ) : (
                      ""
                    )}
                    {data[3] == "3" &&
                    data[4] != "0" &&
                    data[5] != "100000000000000000000000000000000" ? (
                      <TableRow
                        key={"123"}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" scope="row">
                          Max
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {new BigNumber(data[5])
                            .dividedBy(1000000000000000000000000)
                            .toFixed(2)}{" "}
                          NEAR
                        </TableCell>
                      </TableRow>
                    ) : (
                      ""
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <ClearIcon sx={{ color: "red", marginRight: "10px" }} />
            <Typography
              variant="body2"
              sx={{
                fontFamily: theme.typography.typography,
                fontSize: "18px",
                fontWeight: "500",
                color: "red",
              }}
            >
              Your proof is not verified!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProofVerification;
