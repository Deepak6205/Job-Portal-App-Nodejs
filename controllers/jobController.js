import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";
//======CREATE jobs======
export const createJobController = async (req,res,next) => {
    const { company, position} = req.body;
    if(!company || !position){
        next("please provide all fields");
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({job});
};

//==========GET JOBS ============
export const getAllJobsController =async (req,res,next) => {
    const jobs = await jobsModel.find({createdBy:req.user.userId});
    res.status(200).json({
        totalJobs : jobs.length,
        jobs,
    });   
};

//========UPDATE JOBS=======
export const updateJobController = async(req,res,next) =>{
    const {id} = req.params;
    const {company,position} = req.body;
    //validation
    if(!company || !position){
        next("Please provide all fields!");
    }
    //find jobs
    const job = await jobsModel.findOne({_id:id});
    //validation
    if(!job){
        next(`no jobs found with this id ${id}`);
    }
    if(!req.user.userId === job.createdBy.toString()){
        next("You ae not authorized to update this job");
        return;
    }
    const updateJob = await jobsModel.findOneAndUpdate({_id: id}, req.body, {
        new:true,
        runValidators: true,
    });
    // res
    res.status(200).json({updateJob});   
};

 // ========= DELETE JOBS=======

    export const deleteJobController =async (req,res,next)=>{
        const {id} = req.params;
        //find job
        const job = await jobsModel.findOne({_id : id});
        //validation
        if(!job){
            next(`No job found with this id ${id}`);
        }
        if(!req.user.userId === job.createdBy.toString()){
            next("You are not authorized to delete this job");
            return;
        }
        await job.deleteOne();
        res.status(200).json({message: "this job is successfully deleted"});
    };

    // =========== stats job filter ===========
    export const jobStatsController = async (req,res) =>{
        const stats = await jobsModel.aggregate([
            // search by user job
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group : {
                    _id:'$status',
                    count: {$sum: 1} 
                },
            }
        ]);
        // default stats
        const defaultStats = {
            pending: stats.pending || 0,
            rejected: stats.rejected || 0,
            interview: stats.interview || 0,
        };

        // monthly yearly stats
        let monthlyApplication = await jobsModel.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: {
                        year: {$year: "$createdAt" },
                        month: {$month: "$createdAt"},
                    },
                    count:{
                        $sum: 1,
                    },
                },
            },
        ]);
        monthlyApplication = monthlyApplication.map(item => {
            const {_id:{year,month},count} = item
            const date = moment().month(month-1).year(year).format('MMM Y')
            return {date,count}
        }).reverse();

        res.status(200).json({totlaJobs: stats.length, defaultStats,monthlyApplication});
    };

