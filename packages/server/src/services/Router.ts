import express from "express";
import { join } from "path";

const router = express.Router();

router.get("/", (_, res) => {
  res.sendFile(join(__dirname, "client", "build", "index.html"));
});

export default router;
