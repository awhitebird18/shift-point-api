import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  eeNum: Number,
  homeDepartment: String,
  taxProvince: String,
  profileImage: String,
  occupation: String,
  employmentType: String,
  earnings: [
    {
      earningId: String,
      rate: Number,
      primary: Boolean,
      active: Boolean,
      effectiveDate: Date,
    },
  ],
  address: {
    streetAddress: String,
    city: String,
    postalCode: String,
    province: String,
  },
  contact: {
    homePhone: String,
    cellPhone: String,
    workPhone: String,
    personalEmail: String,
    workEmail: String,
  },
  positions: [
    {
      name: String,
      positionId: String,
      start: String,
      end: String,
      earningId: String,
      rate: Number,
      departmentId: String,
      primary: Boolean,
    },
  ],
  timesheetrules: {
    overtimeTemplateId: String,
    breakTemplateId: String,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
