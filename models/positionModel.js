import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  name: String,
  earningId: String,
  departmentId: String,
  premium: [String],
  start: String,
  end: String,
  rate: Number,
});

const Position = mongoose.model("Position", positionSchema);

export default Position;
