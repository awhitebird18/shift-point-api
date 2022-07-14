import express from "express";
import {
  getTimesheets,
  updateTimesheets,
  deleteTimesheets,
  getTimesheetDayStats,
  getCurrentWeekDailyHours,
  getWeeklyEarningBreakdown,
} from "../controllers/timesheetController.js";

const router = express.Router();

router
  .route("/")
  .post(getTimesheets)
  .patch(updateTimesheets)
  .delete(deleteTimesheets);

router.get("/stats", getTimesheetDayStats);

router.get("/currentWeekHours", getCurrentWeekDailyHours);
router.get("/weeklyEarningBreakdown", getWeeklyEarningBreakdown);

export default router;
