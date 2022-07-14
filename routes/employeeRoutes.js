import express from 'express';
import {
  getEmployees,
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  updateEmployeePosition,
  deleteEmployeePosition,
  addEmployeePosition,
  uploadEmployeeImg,
} from '../controllers/employeeController.js';

const router = express.Router();

router.route('/').get(getEmployees).post(addEmployee);

router.route('/:id/upload').post(uploadEmployeeImg);
router.route('/:id').get(getEmployee).patch(updateEmployee).delete(deleteEmployee);

router.route('/position').post(addEmployeePosition);
router.route('/position/:id').patch(updateEmployeePosition).delete(deleteEmployeePosition);

export default router;
