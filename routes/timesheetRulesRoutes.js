import express from 'express';

import {
  getTimesheetRules,
  updateTimesheetRules,
  updateBreakTemplate,
  createBreakTemplate,
  deleteBreakTemplate,
} from '../controllers/timesheetRulesController.js';

const router = express.Router();

router.route('/breaks/:id').patch(updateBreakTemplate).delete(deleteBreakTemplate);

router.route('/breaks').post(createBreakTemplate);

router.route('/').get(getTimesheetRules).patch(updateTimesheetRules);

export default router;
