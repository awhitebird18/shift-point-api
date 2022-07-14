import express from "express";
import {
  createNotification,
  getNotifications,
  updateNotifications,
  toggleRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router
  .route("/")
  .get(getNotifications)
  .patch(updateNotifications)
  .post(createNotification);

router.route("/:id").patch(toggleRead);

export default router;
