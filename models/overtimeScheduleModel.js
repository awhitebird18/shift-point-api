import mongoose from "mongoose";

const overtimeScheduleSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  pay: Date,
  name: String,
  clientId: String,
});

const OvertimeSchedule = mongoose.model(
  "OvertimeSchedule",
  overtimeScheduleSchema
);

export default OvertimeSchedule;
