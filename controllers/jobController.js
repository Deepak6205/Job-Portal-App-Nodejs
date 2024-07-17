import jobsModel from "../models/jobsModel.js";

export const createJobController = async (req,res,next) => {
    const { company, position} = req.body;
    if(!company || !position){
        next("please provide all fields");
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({job});
};