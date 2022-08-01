import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  eeNum: String,
  positionId: String,
  departmentId: String,
  scheduleId: String,
  end: Date,
  start: Date,
  date: Date,
  colorCode: String,
  published: Boolean,
});

const Shift = mongoose.model("Shift", shiftSchema);

export default Shift;
