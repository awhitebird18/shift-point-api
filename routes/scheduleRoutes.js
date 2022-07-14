import express from "express";
import { getSchedules } from "../controllers/scheduleController.js";

const router = express.Router();

router.route("/").get(getSchedules);

export default router;
