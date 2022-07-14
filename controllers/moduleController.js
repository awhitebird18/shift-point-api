import Module from "../models/moduleModel.js";

export const getModules = async (req, res) => {
  const modules = await Module.find({}).sort({ order: 1 });

  return res.status(200).json({
    status: "success",
    data: modules,
  });
};

export const createModule = async (req, res) => {
  try {
    const module = req.body;

    const savedModule = await Module.create(module);

    return res.status(200).json({
      status: "success",
      savedModule,
    });
  } catch (e) {
    res.status(500).json({
      e,
    });
  }
};
