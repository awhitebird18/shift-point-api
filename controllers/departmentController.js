import Department from '../models/departmentModel.js';

export const getDepartments = async (req, res) => {
  const departments = await Department.find();

  res.status(200).json({
    data: departments,
  });
};

export const createDepartment = async (req, res) => {
  const department = req.body.department;

  const newDepartment = await Department.create(department);

  res.status(200).json({
    department: newDepartment,
  });
};

export const updateDepartment = async (req, res) => {
  const id = req.params.id;
  const department = req.body.department;

  const updatedDepartment = await Department.findByIdAndUpdate(id, department, { new: true });

  res.status(200).json({
    department: updatedDepartment,
  });
};

export const deleteDepartment = async (req, res) => {
  const id = req.params.id;

  await Department.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
  });
};
