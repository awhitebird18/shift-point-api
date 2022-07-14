import express from 'express';
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from '../controllers/departmentController.js';

const router = express.Router();

router.route('/').get(getDepartments).post(createDepartment);

router.route('/:id').patch(updateDepartment).delete(deleteDepartment);

export default router;
