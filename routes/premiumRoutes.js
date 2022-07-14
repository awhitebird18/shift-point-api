import express from 'express';

import {
  getPremiums,
  createPremium,
  updatePremium,
  deletePremium,
} from '../controllers/premiumController.js';

const router = express.Router();

router.route('/').get(getPremiums).post(createPremium);

router.route('/:id').patch(updatePremium).delete(deletePremium);

export default router;
