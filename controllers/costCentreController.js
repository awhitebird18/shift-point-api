import CostCentre from '../models/costCentreModel.js';

export const getCostCentres = async (req, res) => {
  const costCentres = await CostCentre.find();

  res.status(200).json({
    status: 'success',
    data: costCentres,
  });
};

export const createCostCentre = async (req, res) => {
  const costCentre = req.body;

  const newCostCentre = await CostCentre.create(costCentre);

  res.status(201).json({
    status: 'success',
    data: newCostCentre,
  });
};

export const updateCostCentre = async (req, res) => {
  const costCentreData = req.body;
  const costCentreId = req.params.id;

  const updatedCostCentre = await CostCentre.findByIdAndUpdate(costCentreId, costCentreData, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedCostCentre,
  });
};

export const deleteCostCentre = async (req, res) => {
  const costCentreId = req.params.id;

  await CostCentre.findByIdAndDelete(costCentreId);

  res.status(204).json({
    status: 'success',
  });
};
