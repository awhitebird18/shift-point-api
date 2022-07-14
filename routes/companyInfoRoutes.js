import express from 'express';
import { createCompanyInfo } from '../controllers/companyInfoController.js';

const router = express.Router();

router.route('/').post(createCompanyInfo);

export default router;
