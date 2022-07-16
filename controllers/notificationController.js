import Notification from "../models/notificationModel.js";
import dayjs from "dayjs";

export const getNotifications = async (req, res) => {
  const lastWeek = dayjs().subtract(56, "day");

  const notifications = await Notification.find({ time: { $gte: lastWeek } });

  notifications.sort((a, b) => {
    return b.time - a.time;
  });

  res.status(200).json({
    status: "success",
    data: notifications,
  });
};

export const createNotification = async (req, res) => {
  const notification = await Notification.create(req.body);

  res.status(200).json({
    status: "success",
    data: notification,
  });
};

export const updateNotifications = async (req, res) => {
  const notificationIds = req.query.id;

  await Notification.updateMany(
    { _id: { $in: notificationIds } },
    { $set: { unread: false } }
  );

  res.status(200).json({
    status: "success",
  });
};

export const toggleRead = async (req, res) => {
  const notificationId = req.params.id;

  const unread = req.query.unread;

  await Notification.findByIdAndUpdate(notificationId, {
    $set: { unread: unread },
  });

  res.status(200).json({
    status: "success",
  });
};
