import Job from '../models/Job.js';

export const createJob = async (req, res) => {
    try {
        const {company, position, status} = req.body;

        // Input Validation
        if (!company || !position) {
            return res.status(400).json({message : "Company and Position fields are required"});
        }

        // Create a Job
        const job = await Job.create({
            company, 
            position, 
            status,
            createdBy : req.userId
        });


        res.status(201).json(job);
    } catch (error) {
        console.error("Creating a job : ", error.message)
        res.status(500).json({message : "Internal Server error"});
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({createdBy : req.userId}).sort("-createdAt");
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Fetching all jobs : ", error.message);
        res.status(500).json({message : "Internal Server error"});
    }
}

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id : req.params.id,
            createdBy : req.userId
        });

        if (!job) {
            return res.status(404).json({message : "Job not found"});
        }

        job.company = req.body.company || job.company;
        job.position = req.body.position || job.position;
        job.status = req.body.status || job.status;

        await job.save();

        res.status(200).json(job);
    } catch (error) {
        console.error("Updating a job : ", error.message);
        res.status(500).json({message : "Internal Server error"});
    }
}

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id : req.params.id,
            createdBy : req.userId
        });

        if (!job) {
            return res.status(404).json({message : "Job not found"});
        }

        res.status(200).json({message : "Job deleted successfully"})
    } catch(error) {
        console.error("Deleting a job : ", error.message);
        res.status(500).json({message : "Internal Server error"});
    }
}