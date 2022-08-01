import Schedule from "../models/scheduleModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const getSchedules = async (req, res) => {
  const token = req.headers["x-access-token"];

  const decoded = jwt.verify(token, "secrettokenofdoom");

  const user = await User.findOne({ username: decoded.username });

  const schedules = await Schedule.find({ owner: user._id });

  return res.status(200).json({
    status: "success",
    data: schedules,
  });
};

export const addNewSchedule = async (req, res) => {
  const token = req.headers["x-access-token"];

  const decoded = jwt.verify(token, "secrettokenofdoom");

  const user = await User.findOne({ username: decoded.username });

  const newSchedule = await Schedule.create({
    ...req.body,
    owner: user._id,
    employeeList: [],
    createdOn: Date.now(),
  });

  return res.status(201).json({
    status: "success",
    data: newSchedule,
  });
};

export const updateSchedule = async (req, res) => {
  const updatedSchedule = await Schedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedSchedule,
  });
};

export const removeSchedule = async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  return res.status(204).json({
    status: "success",
  });
};
