import Employee from "../models/employeeModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";

export const getEmployees = async (req, res) => {
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

  res.status(200).json({
    data: employees,
  });
};

export const getEmployee = async (req, res) => {
  const id = req.params.id;
  const employee = Employee.findById(id);

  res.status(200).json({
    employee,
  });
};

export const addEmployee = async (req, res) => {
  const employee = req.body.employee;

  const newEmployee = await Employee.create(employee);

  res.status(200).json({
    employee: newEmployee,
  });
};

export const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const employee = req.body.employee;

  const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {
    new: true,
  });

  res.status(200).json({
    employee: updatedEmployee,
  });
};

export const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  await Employee.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Employee Deleted",
  });
};

export const updateEmployeePosition = async (req, res) => {
  const id = req.params.id;
  const employeeId = req.body.employeeId;
  const position = req.body.position;

  const employee = await Employee.findById(employeeId);

  const positionIndex = employee.positions.findIndex((el) => {
    return el._id.toString() === id;
  });

  employee.positions.splice(positionIndex, 1, position);

  const updatedEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    { ...employee, positions: [...employee.positions] },
    { new: true }
  );

  const updatedPosition = updatedEmployee.positions.find((el) => {
    return el._id.toString() === id;
  });

  res.status(200).json({
    status: "success",
    position: updatedPosition,
  });
};

export const deleteEmployeePosition = async (req, res) => {
  const id = req.params.id;
  const employeeId = req.body.employeeId;

  const employeeDB = await Employee.findById(employeeId);

  const positionIndex = employeeDB.positions.findIndex((el) => {
    return el._id.toString() === id;
  });

  employeeDB.positions.splice(positionIndex, 1);

  await Employee.findByIdAndUpdate(employeeId, {
    ...employeeDB,
    positions: [...employeeDB.positions],
  });

  res.status(200).json({
    status: "success",
    _id: id,
  });
};

export const addEmployeePosition = async (req, res) => {
  const employeeId = req.body.employeeId;
  const position = req.body.position;

  const employee = await Employee.findById(employeeId);

  employee.positions.push(position);

  const updatedEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    {
      ...employee,
      positions: [...employee.positions],
    },
    { new: true }
  );

  const newPosition = updatedEmployee.positions[employee.positions.length - 1];

  res.status(200).json({
    status: "success",
    position: newPosition,
  });
};

export const uploadEmployeeImg = async (req, res) => {
  const fileStr = req.body.data;

  try {
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev",
    });

    await Employee.findByIdAndUpdate(req.params.id, {
      employeeImage: uploadedResponse.public_id,
    });

    res.status(200).json({
      status: "success",
      data: uploadedResponse,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      error: e.message,
    });
  }
};
