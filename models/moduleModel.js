import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: String,
  colorCode: String,
  active: Boolean,
  slug: String,
  order: Number,
});

const Module = mongoose.model("Module", moduleSchema);

export default Module;
