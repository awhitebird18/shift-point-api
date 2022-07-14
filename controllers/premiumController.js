import Premium from '../models/premiumModel.js';

export const getPremiums = async (req, res) => {
  const premiums = await Premium.find();

  res.status(200).json({
    status: 'success',
    data: premiums,
  });
};

export const createPremium = async (req, res) => {
  const newPremium = req.body.premium;

  const premium = await Premium.create(newPremium);

  res.status(200).json({
    status: 'success',
    premium,
  });
};

export const updatePremium = async (req, res) => {
  const premiumId = req.params.id;
  const updatedPremium = req.body.premium;

  const premium = await Premium.findByIdAndUpdate(premiumId, updatedPremium, { new: true });

  res.status(200).json({
    status: 'success',
    premium,
  });
};

export const deletePremium = async (req, res) => {
  const premiumId = req.params.id;

  await Premium.findByIdAndDelete(premiumId);

  res.status(200).json({
    status: 'success',
  });
};
