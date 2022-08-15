import Bulletin from "../models/bulletinModel.js";

export const getBulletin = async (req, res) => {
  const bulletins = await Bulletin.find().sort({ createdAt: 1 }).limit(5);

  return res.status(200).json({
    status: "success",
    data: bulletins,
  });
};

export const createBulletin = async (req, res) => {
  const newDoc = await Bulletin.create(req.body);

  return res.status(200).json({
    status: "success",
    data: newDoc,
  });
};

export const updatePost = async (req, res) => {
  const updatedDoc = await Bulletin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedDoc,
  });
};
