import Shift from "../models/shiftModel.js";

export const getShifts = async (req, res) => {
  let { startDate, endDate } = req.query;

  startDate = new Date(`${startDate} 12:00 am`);

  if (endDate === "undefined" || !endDate) {
    endDate = new Date(startDate.getTime());

    endDate.setDate(startDate.getDate() + 6);
  } else {
    endDate = new Date(endDate);
  }

  const shifts = await Shift.find({
    $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
  });

  return res.status(200).json({
    status: "success",
    data: shifts,
  });
};

export const addNewShift = async (req, res) => {
  const newShift = await Shift.create(req.body);

  return res.status(201).json({
    status: "success",
    data: newShift,
  });
};

export const updateShift = async (req, res) => {
  const updatedShift = await Shift.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedShift,
  });
};

export const deleteShift = async (req, res) => {
  await Shift.findByIdAndDelete(req.params.id);
  return res.status(204).json({
    status: "success",
  });
};
