import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  name: String,
  owner: String,
  employeeList: [String],
  departments: [String],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
