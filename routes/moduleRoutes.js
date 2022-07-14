import express from 'express';
import { getModules, createModule } from '../controllers/moduleController.js';

const router = express.Router();

router.route('/').get(getModules).post(createModule);

export default router;
