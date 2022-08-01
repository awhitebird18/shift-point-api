import Timesheet from "../models/timesheetModel.js";
import Employee from "../models/employeeModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Earning from "../models/earningModel.js";

export const getTimesheets = async (req, res) => {
  const timesheetData = Timesheet.find({
    $and: [{ date: { $gte: req.body.from } }, { date: { $lte: req.body.to } }],
  });

  if (req.body.eeNum) {
    timesheetData.find({ eeNum: +req.body.eeNum });
  }

  const results = await timesheetData;

  res.status(200).json({
    status: "success",
    data: results,
  });
};

export const updateTimesheets = async (req, res) => {
  const timesheets = req.body;

  const timesheetsUpdated = timesheets
    .filter((el) => {
      return !el.remove;
    })
    .map((el) => {
      return {
        ...el,
        _id: el.id,
        status: el.approved ? "approved" : el.status,
      };
    });

  timesheetsUpdated.forEach(async (timeEl) => {
    const result = await Timesheet.findByIdAndUpdate(
      timeEl.id,
      { $set: timeEl },
      { new: true }
    );

    if (!result) {
      const newFish = new Timesheet(timeEl);
      await newFish.save();
    }
  });

  res.status(201).json({
    status: "Success",
  });
};

export const deleteTimesheets = async (req, res) => {
  await Timesheet.deleteMany({ _id: { $in: req.body } });

  res.status(204).json({
    status: "Success",
  });
};

export const saveTimesheets = async (req, res) => {
  const timesheets = req.timesheets;

  await timesheets.forEach(async (el) => {
    const result = await Timesheet.create(el);
  });

  return;
};

export const getTimesheetDayStats = async (req, res) => {
  const currentTimestamp = new Date(Date.now());
  const currentYear = currentTimestamp.getFullYear();
  const currentMonth = currentTimestamp.getMonth();
  const currentDate = currentTimestamp.getDate();
  const todaysDate = new Date(currentYear, currentMonth, currentDate);
  const startDate = new Date(2022, 3, 10);
  const todaysDate2 = new Date(2022, 3, 11);
  const endDate = new Date(2022, 3, 16);

  // Get Employees first. Need to find a better way of handling this as it is a copy from the employee controller
  const token = req.headers["x-access-token"];

  const decoded = jwt.verify(token, "secrettokenofdoom");

  const user = await User.findOne({ username: decoded.username });

  const departmentIds = user.departments.map((el) => {
    return el.id;
  });

  const excludedEmployees = [];

  user.departments.forEach((department) => {
    department.exceptions.forEach((el) => {
      excludedEmployees.push(el);
    });
  });

  const employees = await Employee.find({
    $and: [
      { homeDepartment: { $in: departmentIds } },
      { _id: { $nin: excludedEmployees } },
    ],
  });

  const eeNums = employees.map((el) => {
    return el.eeNum;
  });

  try {
    const timesheetData = await Timesheet.find({
      $and: [
        { date: { $gte: startDate } },
        { date: { $lte: endDate } },
        { eeNum: { $in: eeNums } },
      ],
    });

    const totalPendingRecords = timesheetData.filter((el) => {
      return el.status === "pending";
    }).length;

    const totalApprovedRecords = timesheetData.filter((el) => {
      return el.status === "approved";
    }).length;

    const missingPunches = timesheetData.filter((el) => {
      return el.status === "working" && el.date < todaysDate2;
    }).length;

    const currentlyWorking = timesheetData.filter((el) => {
      return (
        el.status === "working" && el.date.getTime() === todaysDate2.getTime()
      );
    }).length;

    const stats = {
      totalApprovedRecords,
      totalPendingRecords,
      missingPunches,
      currentlyWorking,
    };

    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: "Failed to retrieve data",
    });
  }
};

export const getCurrentWeekDailyHours = async (req, res) => {
  const startOfWeek = req.query.start;
  const currentDate = new Date(Date.now());

  const dateRange = [];

  while (currentDate.getDay() !== +startOfWeek) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  endDate.setDate(endDate.getDate() + 6);

  for (let i = 0; i <= 6; i++) {
    dateRange.push(new Date(currentDate));

    currentDate.setDate(currentDate.getDate() + 1);
  }

  try {
    const timesheets = await Timesheet.find({
      $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
    });

    const dailyTotals = [];

    dateRange.forEach((date) => {
      const timesheetsForDate = timesheets.filter((el) => {
        return el.date.getTime() === date.getTime();
      });

      dailyTotals.push({ date, approvedHours: 0, pendingHours: 0 });

      timesheetsForDate.forEach((timeEl) => {
        if (!timeEl.end || !timeEl.start) {
          return;
        }

        const hours =
          (timeEl.end.getTime() - timeEl.start.getTime()) / 60 / 60 / 1000;

        const index = dailyTotals.findIndex((el) => {
          return el.date && el.date.getTime() === timeEl.date.getTime();
        });

        dailyTotals[index][
          timeEl.status === "approved" ? "approvedHours" : "pendingHours"
        ] += hours;
      });
    });

    const maxDailyHours = dailyTotals.reduce((a, b) => {
      return Math.max(a, b.hours);
    }, 0);

    res.status(200).json({
      status: "success",
      data: {
        dailyTotals,
        maxDailyHours,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
    });
  }
};

export const getWeeklyEarningBreakdown = async (req, res) => {
  const EarningList = await Earning.find();

  const startOfWeek = req.query.start;
  const currentDate = new Date(Date.now());

  const dateRange = [];

  while (currentDate.getDay() !== +startOfWeek) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  console.log(currentDate);

  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  endDate.setDate(endDate.getDate() + 6);

  for (let i = 0; i <= 6; i++) {
    dateRange.push(new Date(currentDate));

    currentDate.setDate(currentDate.getDate() + 1);
  }

  try {
    const timesheets = await Timesheet.find({
      $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
    });

    console.log(timesheets);

    const earningData = [];

    dateRange.forEach((date) => {
      const timesheetsForDate = timesheets.filter((el) => {
        return el.date.getTime() === date.getTime();
      });

      timesheetsForDate.forEach((timeEl) => {
        if (!timeEl.end || !timeEl.start) {
          return;
        }

        const hours =
          (timeEl.end.getTime() - timeEl.start.getTime()) / 60 / 60 / 1000;

        const index = earningData.findIndex((el) => {
          return el.earningId === timeEl.earningId;
        });

        const earningName = EarningList.find((el) => {
          return el._id.toString() === timeEl.earningId;
        }).name;

        if (index === -1) {
          earningData.push({ earningId: timeEl.earningId, earningName, hours });
        } else {
          earningData[index].hours += hours;
        }
      });
    });

    res.status(200).json({
      status: "success",
      data: earningData,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
    });
  }
};
