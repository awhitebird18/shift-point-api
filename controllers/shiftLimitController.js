import ShiftLimit from '../models/shiftLimitModel.js';

export const getShiftLimits = async (req, res) => {
  const shiftLimits = await ShiftLimit.find();

  res.status(200).json({
    status: 'success',
    shiftLimits,
  });
};

export const updateShiftLimits = async (req, res) => {
  const id = req.params;
  const shiftLimits = req.body.shiftLimits;

  const updatedShiftLimits = ShiftLimit.findByIdAndUpdate(id, shiftLimits, { new: true });

  res.status(200).json({
    status: 'success',
    updatedShiftLimits,
  });
};
