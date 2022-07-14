import mongoose from "mongoose";

const bulletinSchema = new mongoose.Schema({
  author: String,
  createdAt: String,
  title: String,
  content: String,
  seen: [String],
  highPriority: Boolean,
});

const Bulletin = mongoose.model("Bulletin", bulletinSchema);

export default Bulletin;
