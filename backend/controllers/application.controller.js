import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob= async(req,res)=>{
    try{
        const userId= req.id;
        const jobId= req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"job id is required",
                success:false,
            })
        };

        //check user have alreaey applied or not

        const existingApplication = await Application.findOne({
            job:jobId,
            applicant:userId
        });

        if(existingApplication){
            return res.status(400).json({
                message:"you have already applied",
                success: false,
            });
        }

        //check if the job not exits

        const job= await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "job not found",
                success: false,
            })
        }

        //crate application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        })

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "job aaplied successfylly",
            success: true
        })
    }catch(error){
        console.log(error);
    }
}

export const getAppliedJobs= async(req,res)=>{
    try{
        const userId= req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({path:'job',
            options:{sort:{createdAt:-1}},
            populate:{path:'company',
                options:{sort:{createdAt:-1}}
            }
        });

        if(!application){
            return res.status(404).json({
                message:"no application is found",
                success:false,
            })
        }

        return res.status(200).json({
            application,
            success:true,

        })
        
    }catch(error){
        console.log(error);
    }
}

//admin see how many user
export const getApplicants = async(req,res)=>{
    try{
        const jobId= req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message: " job not found ",
                success:false,
            });
        }

        return res.status(200).json({
            job,
            success:true,
        });


    }catch(error){
        console.log(error);
    }
}



// update status

export const updateStatus= async(req,res)=>{
    try{
        const {status}= req.body;
        const appicationId= req.params.id;
        if(!status){
            return res.status(404).json({
                message:"status is required",
                success:false,
            })
        }
        // find the application by appicantinn id
        const application= await Application.findOne({_id: appicationId})
        if(!application){
            return res.status(404).json({
                message:"application not found",
                success:false,
            })
        };
        //update statys

        application.status= status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"status updated succesfully",
            success:true,
        })
    }
    catch(error){
        console.log(error);
    }
}