import mongoose from "mongoose";

const timesheetSchema = new mongoose.Schema(
  {
    id: String,
    _id: String,
    eeNum: Number,
    breakDeductions: Number,
    departmentId: String,
    earningId: String,
    positionId: String,
    status: String,
    dateFormatted: String,
    date: Date,
    start: Date,
    end: Date,
    employeeStart: String,
    employeeEnd: String,
    scheduledStart: String,
    scheduledEnd: String,
    rate: Number,
    otHours: Number,
    premiums: [
      {
        start: Date,
        end: Date,
        premiumId: String,
        status: String,
        rate: Number,
      },
    ],
  },
  { supressReservedKeysWarning: true, _id: false }
);

const Timesheet = mongoose.model("Timesheet", timesheetSchema);

export default Timesheet;
