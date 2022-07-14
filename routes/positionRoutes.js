import express from 'express';
import {
  getPositions,
  createPosition,
  updatePosition,
  deletePosition,
} from '../controllers/positionController.js';

const router = express.Router();

router.route('/').get(getPositions).post(createPosition);
router.route('/:id').patch(updatePosition).delete(deletePosition);

export default router;
