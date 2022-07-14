import express from 'express';

import {
  getCostCentres,
  createCostCentre,
  updateCostCentre,
  deleteCostCentre,
} from '../controllers/costCentreController.js';

const router = express.Router();

router.route('/').get(getCostCentres).post(createCostCentre);

router.route('/:id').patch(updateCostCentre).delete(deleteCostCentre);

export default router;
