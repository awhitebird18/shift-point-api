import mongoose from "mongoose";

const earningSchema = new mongoose.Schema({
  name: String,
  overtimeEligible: Boolean,
  primary: Boolean,
  rate: Number,
  minRate: Number,
  maxRate: Number,
});

const Earning = mongoose.model("Earning", earningSchema);

export default Earning;
