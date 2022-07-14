import mongoose from "mongoose";

const payScheduleSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  pay: Date,
  name: String,
});

const PaySchedule = mongoose.model("PaySchedule", payScheduleSchema);

export default PaySchedule;
