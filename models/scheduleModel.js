import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  name: String,
  owner: String,
  employeeList: [String],
  departments: [String],
  createdOn: Date,
  current: Boolean,
  publishedTo: Date,
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
