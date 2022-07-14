import TimesheetRules from '../models/timesheetRulesModel.js';

export const getTimesheetRules = async (req, res) => {
  const timesheetRules = await TimesheetRules.findOne();

  res.status(200).json({
    status: 'success',
    data: timesheetRules,
  });
};

export const addTimesheetRules = async (req, res) => {
  //   const timesheetRules = req.body;

  res.status(200).json({
    status: 'success',
    message: 'Rules Received',
  });
};

export const updateTimesheetRules = async (req, res) => {
  await TimesheetRules.findByIdAndUpdate('6201ace36373fe0082b4a494', req.body);
  res.status(200).json({
    status: 'success',
  });
};

export const updateBreakTemplate = (req, res) => {
  const data = req.body.currentBreak;

  for (const breakEl of data.breaks) {
    delete breakEl._id;
  }

  const timesheetRulesId = '6201ace36373fe0082b4a494';
  const breakTemplateId = req.params.id;

  let updatedBreakTemplate;

  TimesheetRules.findById(timesheetRulesId)
    .then((timesheetRules) => {
      updatedBreakTemplate = timesheetRules.breakTemplates.id(breakTemplateId);

      updatedBreakTemplate.set({ ...data, breaks: [...data.breaks] });

      return timesheetRules.save();
    })
    .then((timesheetRules) => {
      // const updatedBreakTemplate = updatedBreakTemplate.pop();
      res.status(200).json({ status: 'success', data: updatedBreakTemplate });
    })
    .catch((e) => {
      res.status(400).json({ error: e });
    });
};

export const createBreakTemplate = async (req, res) => {
  const data = req.body.currentBreak;

  for (const breakEl of data.breaks) {
    delete breakEl._id;
  }

  const timesheetRules = await TimesheetRules.findByIdAndUpdate(
    '6201ace36373fe0082b4a494',
    { $push: { breakTemplates: data } },
    { new: true }
  );

  const updatedBreakTemplate = timesheetRules.breakTemplates.pop();

  res.status(200).json({
    status: 'success',
    data: updatedBreakTemplate,
  });
};

export const deleteBreakTemplate = async (req, res) => {
  await TimesheetRules.findByIdAndUpdate(
    '6201ace36373fe0082b4a494',
    { $pull: { breakTemplates: req.params.id } },
    { new: true }
  );

  res.status(204).json({
    status: 'success',
    data: 'deleted!',
  });
};
