import mongoose from "mongoose";

const costCentreSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const CostCentre = mongoose.model("CostCentre", costCentreSchema);

export default CostCentre;
