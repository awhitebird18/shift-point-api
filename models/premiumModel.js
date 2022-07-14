import mongoose from "mongoose";

const premiumSchema = new mongoose.Schema({
  name: String,
  0: {
    start: String,
    end: String,
  },
  1: {
    start: String,
    end: String,
  },
  2: {
    start: String,
    end: String,
  },
  3: {
    start: String,
    end: String,
  },
  4: {
    start: String,
    end: String,
  },
  5: {
    start: String,
    end: String,
  },
  6: {
    start: String,
    end: String,
  },
  positions: [String],
  earningId: String,
  threshold: Number,
  strict: Boolean,
});

const Premium = mongoose.model("Premium", premiumSchema);

export default Premium;
