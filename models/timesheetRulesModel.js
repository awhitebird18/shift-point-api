import mongoose from "mongoose";

const timesheetSettingsSchema = new mongoose.Schema({
  clientId: Number,
  overtime: [
    {
      name: String,
      dailyThreshold1: Number,
      dailyThresholdEarningId1: String,
      dailyThreshold2: Number,
      dailyThresholdEarningId2: String,
      periodThreshold: Number,
      periodThresholdEarningId: String,
      periodLength: Number,
      periodStartDate: String,
    },
  ],
  breakTemplates: [
    {
      templateName: String,
      templateId: String,
      breaks: [
        {
          breakTypeId: Number,
          name: String,
          length: Number,
          start: Number,
          unpaid: Boolean,
          strict: Boolean,
          punchThreshold: Number,
          enforceEarly: Boolean,
          enforceLate: Boolean,
        },
      ],
    },
  ],
  unscheduledRounding: {
    startType: String,
    startUnit: Number,
    endType: String,
    endUnit: Number,
  },
  scheduledRounding: {
    beforeStart: {
      window: Number,
      beforeWindowType: String,
      beforeWindowUnit: String,
      afterWindowType: String,
      afterWindowUnit: String,
    },
    afterStart: {
      window: Number,
      beforeWindowType: String,
      beforeWindowUnit: String,
      afterWindowType: String,
      afterWindowUnit: String,
    },
    beforeEnd: {
      window: Number,
      beforeWindowType: String,
      beforeWindowUnit: String,
      afterWindowType: String,
      afterWindowUnit: String,
    },
    afterEnd: {
      window: Number,
      beforeWindowType: String,
      beforeWindowUnit: String,
      afterWindowType: String,
      afterWindowUnit: String,
    },
  },
  shiftRules: {
    minShiftLength: Number,
    minShiftHandling: String,
    maxShiftLength: Number,
    maxShiftHandling: String,
    endOfDay: String,
    endOfDayHandling: String,
    duplicatePunchHandling: Number,
  },
  startOfWeekIndex: Number,
  templates: [
    {
      name: String,
      breaksId: String,
      overtimeId: String,
      employees: [String],
    },
  ],
});

const TimesheetRules = mongoose.model(
  "TimesheetRules",
  timesheetSettingsSchema
);

export default TimesheetRules;
