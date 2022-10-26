import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  active: Boolean,
  clientId: String,
  admin: Boolean,
  title: String,
  password: String,
  passwordConfirm: String,
  email: String,
  dashboardConfig: {
    weeklyHours: {
      firstThreshold: Number,
      secondThreshold: Number,
    },
  },
  moduleAccess: [{ moduleId: String, access: Boolean }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  departments: [
    {
      id: String,
      access: Boolean,
      exceptions: [String],
    },
  ],
});

userSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
