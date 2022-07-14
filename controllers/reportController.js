import Timesheet from "../models/timesheetModel.js";
import Breaksheet from "../models/breaksheetModel.js";
import Department from "../models/departmentModel.js";
import Position from "../models/positionModel.js";
import Earning from "../models/earningModel.js";
import Employee from "../models/employeeModel.js";
// import path from 'path'

import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

export const getReport = async (req, res) => {
  const query = req.query;

  const filterArr = [
    { date: { $gte: query.dateFrom } },
    { date: { $lte: query.dateTo } },
  ];

  if (query.status) {
    filterArr.push({ status: query.status });
  }

  const timesheets = await Timesheet.find({ $and: filterArr });
  const breaksheets = await Breaksheet.find({});

  const employees = await Employee.find({});
  const earnings = await Earning.find({});
  const departments = await Department.find({});
  const positions = await Position.find({});

  const records = timesheets.map((timesheet) => {
    const employee = employees.find((el) => {
      return +el.eeNum === +timesheet.eeNum;
    });

    const department = departments.find((department) => {
      return department._id.toString() === employee.homeDepartment;
    });

    const earning = earnings.find((earning) => {
      return earning._id.toString() === timesheet.earningId;
    });

    const breaksDeduction = breaksheets.reduce((prev, curr) => {
      if (curr.timesheet === timesheet._id && curr.unpaid) {
        return (
          prev +
          (dayjs(curr.end).valueOf() - dayjs(curr.start).valueOf()) /
            60 /
            60 /
            1000
        );
      }

      return prev;
    }, 0);

    if (!employee) {
      return { name: "", eeNum: "" };
    }

    const startTime = dayjs(timesheet.start);
    const endTime = dayjs(timesheet.end);
    const date = dayjs(timesheet.date);
    const hours =
      Math.round(
        ((endTime.valueOf() - startTime.valueOf()) / 60 / 60 / 1000) * 100
      ) / 100;

    return {
      eeNum: employee.eeNum,
      name: `${employee.firstName} ${employee.lastName}`,
      departmentNumber: department.number,
      departmentName: department.name,
      earningType: earning.type,
      earningName: earning.name,
      date: date,
      startTime: startTime,
      endTime: endTime,
      hours: (hours - breaksDeduction).toFixed(2),
      unpaidBreaks: breaksDeduction,
      status: timesheet.status ? timesheet.status : "",
    };
  });

  const sortedRecords = records
    .sort((a, b) => {
      if (a.eeNum < b.eeNum) return -1;
      if (a.eeNum > b.eeNum) return -1;

      if (a.date - b.date < 0) return -1;
      if (a.date - b.date > 0) return 1;

      if (a.startTime - b.startTime < 0) return -1;
      if (a.startTime - b.startTime > 0) return 1;
    })
    .map((el) => {
      return {
        ...el,
        startTime: el.startTime.format("hh:mm a"),
        endTime: el.endTime.format("hh:mm a"),
        date: el.date.format("MM/DD/YYYY"),
      };
    });

  res.status(200).json({
    status: "success",
    data: sortedRecords,
  });
};
