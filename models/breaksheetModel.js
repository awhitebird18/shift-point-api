import mongoose from "mongoose";

const breaksheetSchema = new mongoose.Schema(
  {
    id: String,
    _id: String,
    breakTypeId: Number,
    eeNum: Number,
    hours: Number,
    unpaid: Boolean,
    timesheet: String,
    status: String,
    dateFormatted: String,
    date: String,
    start: String,
    end: String,
    employeeStart: String,
    employeeEnd: String,
    name: String,
    inactive: Boolean,
  },
  { supressReservedKeysWarning: true, _id: false }
);

const Breaksheet = mongoose.model("Breaksheet", breaksheetSchema);

export default Breaksheet;
