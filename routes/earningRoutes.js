import express from 'express';
import {
  getEarnings,
  createEarning,
  updateEarning,
  deleteEarning,
} from '../controllers/earningController.js';

const router = express.Router();

router.route('/').get(getEarnings).post(createEarning);

router.route('/:id').patch(updateEarning).delete(deleteEarning);

export default router;
