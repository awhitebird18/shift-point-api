import OvertimeSchedule from '../models/overtimeScheduleModel.js';

export const getOvertimeSchedule = async (req, res) => {
  const overtimeSchedule = await OvertimeSchedule.find();

  return res.status(200).json({
    status: 'success',
    data: overtimeSchedule,
  });
};

export const createOvertimeSchedule = async (req, res) => {
  const overtimeSchedule = req.body;

  overtimeSchedule.forEach(async (el) => {
    const newEntry = new OvertimeSchedule(el);

    await newEntry.save();
  });

  return res.status(200).json({
    status: 'success',
  });
};
