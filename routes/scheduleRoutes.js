import express from "express";
import {
  getSchedules,
  addNewSchedule,
  updateSchedule,
} from "../controllers/scheduleController.js";

const router = express.Router();

router.route("/").get(getSchedules).post(addNewSchedule);

router.route("/:id").patch(updateSchedule);

export default router;
