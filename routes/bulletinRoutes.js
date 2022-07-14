import express from "express";

import {
  getBulletin,
  createBulletin,
} from "../controllers/bulletinController.js";

const router = express.Router();

router.route("/").get(getBulletin).post(createBulletin);

export default router;
