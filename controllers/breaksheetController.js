import Breaksheet from './../models/breaksheetModel.js';

export const getBreaksheets = async (req, res) => {
  const breaksheetData = Breaksheet.find({
    $and: [{ date: { $gte: req.body.from } }, { date: { $lte: req.body.to } }],
  });

  if (req.body.eeNum) {
    breaksheetData.find({ eeNum: req.body.eeNum });
  }

  const results = await breaksheetData;

  res.status(200).json({
    status: 'success',
    data: results,
  });
};

export const deleteBreaksheets = async (req, res) => {
  await Breaksheet.deleteMany({ _id: { $in: req.body } });

  res.status(200).json({
    status: 'success',
  });
};

export const updateBreaksheets = (req, res) => {
  const breaksheetsUpdated = req.body
    .filter((el) => {
      return !el.remove;
    })
    .map((el) => {
      return { ...el, _id: el.id };
    });

  breaksheetsUpdated.forEach(async (breakEl) => {
    let result = await Breaksheet.findByIdAndUpdate(breakEl.id, { $set: breakEl }, { new: true });

    if (!result) {
      const fish = new Breaksheet(breakEl);
      await fish.save();
    }
  });

  res.status(201).json({
    status: 'Success',
    breaksheetsUpdated,
  });
};
