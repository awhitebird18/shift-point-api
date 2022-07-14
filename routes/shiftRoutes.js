import express from "express";

import {
  addNewShift,
  getShifts,
  updateShift,
  deleteShift,
} from "../controllers/shiftController.js";

const router = express.Router();

router.route("/").get(getShifts).post(addNewShift);

router.route("/:id").patch(updateShift).delete(deleteShift);

export default router;
