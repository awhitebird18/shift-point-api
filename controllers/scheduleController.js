import Schedule from "../models/scheduleModel.js";

export const getSchedules = async (req, res) => {
  const schedules = await Schedule.find();

  return res.status(200).json({
    status: "success",
    data: schedules,
  });
};

export const addNewSchedule = async (req, res) => {
  const newSchedule = await Schedule.create(req.body);

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
