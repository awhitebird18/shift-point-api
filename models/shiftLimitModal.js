import mongoose from "mongoose";

const shiftLimitSchema = new mongoose.Schema({
  min: Number,
  max: Number,
});

const ShiftLimit = mongoose.model("ShiftLimit", shiftLimitSchema);

export default ShiftLimit;
