import Position from '../models/positionModel.js';

export const getPositions = async (req, res) => {
  const positions = await Position.find();

  res.status(200).json({
    status: 'success',
    data: positions,
  });
};

export const createPosition = async (req, res) => {
  const position = req.body.position;

  const newPosition = await Position.create(position);

  res.status(200).json({
    status: 'success',
    position: newPosition,
  });
};

export const updatePosition = async (req, res) => {
  const position = req.body.position;
  const id = req.params.id;

  const updatedPosition = await Position.findByIdAndUpdate(id, position, { new: true });

  res.status(200).json({
    status: 'success',
    position: updatedPosition,
  });
};

export const deletePosition = async (req, res) => {
  const id = req.params.id;

  await Position.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    _id: id,
  });
};
