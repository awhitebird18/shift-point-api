import express from 'express';
import {
  getBreaksheets,
  updateBreaksheets,
  deleteBreaksheets,
} from './../controllers/breaksheetController.js';

const router = express.Router();

router.route('/').post(getBreaksheets).patch(updateBreaksheets).delete(deleteBreaksheets);

export default router;
