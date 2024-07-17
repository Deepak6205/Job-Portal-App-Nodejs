import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController } from '../controllers/jobController.js';

const router = express.Router();
//Route
//create job || POST
router.post('/create-job',userAuth,createJobController);

export default router;