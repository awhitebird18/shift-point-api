import Bulletin from "../models/bulletinModel.js";

export const getBulletin = async (req, res) => {
  const bulletins = await Bulletin.find().sort({ createdAt: 1 }).limit(3);

  return res.status(200).json({
    status: "success",
    data: bulletins,
  });
};

export const createBulletin = async (req, res) => {
  await Bulletin.create(req.body);

  return res.status(200).json({
    status: "success",
  });
};
