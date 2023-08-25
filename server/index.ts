import * as dotenv from "dotenv";
import { connectMongoDB } from "./connect";
import { merkleTreeRouter } from "./src/routes/merkleTreeRouter";

// import { servicesRouter } from "./src/routes/servicesRouter";

const express = require("express");
const cors = require("cors");
const json = require("body-parser");
dotenv.config();
var app = express();
const port = process.env.PORT;

app.use(json());
app.use(cors());
app.use("/merkletree", merkleTreeRouter);

app.get("/", async (req: any, res: any) => {
  res.send("This is proof-of-information api");
});

app.listen(port, async () => {
  console.log("Server listening at port: ", port);
  connectMongoDB();
});
