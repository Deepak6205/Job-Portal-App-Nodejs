import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, updateJobController } from '../controllers/jobController.js';

const router = express.Router();
//Route
//create job || POST
router.post('/create-job',userAuth,createJobController);


//GET JOBS || GET
router.get('/get-job',userAuth,getAllJobsController);

//UPDATE JOBS || PUT or PATCH
router.patch('/update-job/:id',userAuth,updateJobController);

//DELETE JOBS || DELETE
router.delete('/delete-job/:id',userAuth,deleteJobController);

export default router;