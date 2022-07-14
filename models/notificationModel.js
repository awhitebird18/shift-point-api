import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  time: Date,
  message: String,
  users: [String],
  unread: Boolean,
  dismissed: Boolean,
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
