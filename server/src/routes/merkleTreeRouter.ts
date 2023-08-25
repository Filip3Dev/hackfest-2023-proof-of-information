import { Request, Response } from "express";
import {
  getMerkleTreeInfo,
  provideAuthHash,
  buildMerkleTree,
  convertCachedToLeaf,
  getInfo,
  checkUserLeaf,
} from "../controllers/merkleTreeContronller";

const express = require("express");
const router = express.Router();

router.post("/merkleinfo/", async (req: Request, res: Response) => {
  try {
    var resData = await getMerkleTreeInfo();
    return res.status(201).json(resData);
  } catch (err) {
    console.log("Error: POST /merkletree/info", err);
    return res.status(404).json({ err: (err as Error).message });
  }
});

router.post("/provideAuthHash/", async (req: Request, res: Response) => {
  try {
    var resData = await provideAuthHash(req);
    return res.status(201).json(resData);
  } catch (err) {
    console.log("Error: POST /user/provideAuthHash/", err);
    return res.status(404).json({ err: (err as Error).message });
  }
});

router.post("/info/", async (req: Request, res: Response) => {
  try {
    var resData = await getInfo(req);
    return res.status(201).json(resData);
  } catch (err) {
    console.log("Error: POST /merkletree/user/info/", err);
    return res.status(404).json({ err: (err as Error).message });
  }
});

router.post("/checkUserLeaf/", async (req: Request, res: Response) => {
  try {
    var resData = await checkUserLeaf(req);
    return res.status(201).json(resData);
  } catch (err) {
    console.log("Error: POST /merkletree/user/checkUserLeaf/", err);
    return res.status(404).json({ err: (err as Error).message });
  }
});

router.post("/test/", async (req: Request, res: Response) => {
  try {
    var resData = await buildMerkleTree();
    return res.status(201).json(resData);
  } catch (err) {
    console.log("Error: POST /merkletree/user/test/", err);
    return res.status(404).json({ err: (err as Error).message });
  }
});

router.post("/test2/", async (req: Request, res: Response) => {
  try {
    var resData = await convertCachedToLeaf();
    return res.status(201).json(resData);
  } catch (err) {
    console.log("Error: POST /merkletree/user/test/", err);
    return res.status(404).json({ err: (err as Error).message });
  }
});

export { router as merkleTreeRouter };
