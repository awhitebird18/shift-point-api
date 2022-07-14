import express from "express";

import { getReport } from "../controllers/reportController.js";

const router = express.Router();

router.route("/timesheet").get(getReport);

export default router;
