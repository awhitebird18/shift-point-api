import mongoose from "mongoose";

const companyInfoSchema = new mongoose.Schema({
  companyId: String,
  companyName: String,
  survey: {
    singleUser: Boolean,
  },
});

export default CompanyInfo = mongoose.model("CompanyInfo", companyInfoSchema);
