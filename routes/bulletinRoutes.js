import express from "express";

import {
  getBulletin,
  createBulletin,
  updatePost,
} from "../controllers/bulletinController.js";

const router = express.Router();

router.route("/").get(getBulletin).post(createBulletin);

router.route("/:id").patch(updatePost);

export default router;
