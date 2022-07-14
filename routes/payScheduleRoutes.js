import express from 'express';
import {
  getPaySchedule,
  createPaySchedule,
  deletePaySchedule,
} from './../controllers/payScheduleController.js';

const router = express.Router();

router.route('/').get(getPaySchedule).post(createPaySchedule).delete(deletePaySchedule);

export default router;
