import PaySchedule from "./../models/paySchedule.js";

export const getPaySchedule = async (req, res) => {
  const paySchedule = await PaySchedule.find();

  res.status(200).json({
    status: "success",
    data: paySchedule,
  });
};

export const createPaySchedule = async (req, res) => {
  const paySchedule = [...req.body];

  paySchedule.forEach(async (el) => {
    const newEntry = new PaySchedule(el);

    await newEntry.save();
  });

  res.status(200).json({
    status: "success",
  });
};

export const deletePaySchedule = async (req, res) => {
  await PaySchedule.deleteMany();

  res.status(200).json({
    message: "deleted",
  });
};
