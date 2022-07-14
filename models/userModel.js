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
  moduleAccess: {
    timesheet: {
      access: Boolean,
      save: Boolean,
      departmentChange: Boolean,
      payrate: {
        access: Boolean,
        write: Boolean,
      },
      premium: {
        access: Boolean,
        write: Boolean,
      },
      break: {
        access: Boolean,
        write: Boolean,
      },
    },
    scheduler: {
      access: Boolean,
    },
    employees: {
      access: Boolean,
      personal: {
        access: Boolean,
        write: Boolean,
      },
      contact: {
        access: Boolean,
        write: Boolean,
      },
      department: {
        access: Boolean,
        write: Boolean,
      },
      position: {
        access: Boolean,
        write: Boolean,
      },
      payinfo: {
        access: Boolean,
        write: Boolean,
      },
    },
    settings: {
      access: Boolean,
    },
    reports: {
      access: Boolean,
    },
    users: {
      access: Boolean,
      basicinfo: {
        access: Boolean,
        write: Boolean,
      },
      employee: {
        access: Boolean,
        write: Boolean,
      },
      module: {
        access: Boolean,
        write: Boolean,
      },
    },
  },
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
