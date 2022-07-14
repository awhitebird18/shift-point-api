import express from 'express';
import {
  getOvertimeSchedule,
  createOvertimeSchedule,
} from '../controllers/overtimeScheduleController.js';

const router = express.Router();

router.route('/').get(getOvertimeSchedule).post(createOvertimeSchedule);

export default router;
