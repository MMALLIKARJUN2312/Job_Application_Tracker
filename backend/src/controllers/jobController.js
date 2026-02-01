import Job from '../models/Job.js';
import AppError from '../utils/errorHandler.js'
import asyncWrapper from '../utils/asyncHandler.js';

export const createJob = asyncWrapper(async (req, res) => {

    const { company, position, status } = req.body;

    // Input Validation
    if (!company || !position) {
        throw new AppError("Company and Position fields are required", 400);
    }

    // User Validation
    if (!req.userid) {
        throw new AppError("Unauthorized", 401);
    }

    // Create a Job
    const job = await Job.create({
        company,
        position,
        status,
        createdBy: req.userId
    });

    res.status(201).json(job);
});

export const getAllJobs = asyncWrapper(async (req, res) => {

    // User Validation
    if (!req.userId) {
        throw new AppError("Unauthorized", 401);
    }

    const jobs = await Job.find({ createdBy: req.userId }).sort("-createdAt");
    res.status(200).json(jobs);
});

export const updateJob = asyncWrapper(async (req, res) => {
    const job = await Job.findOne({
        _id: req.params.id,
        createdBy: req.userId
    });

    if (!job) {
        throw new AppError("Job not found", 404);
    }

    // Job details
    job.company = req.body.company || job.company;
    job.position = req.body.position || job.position;
    job.status = req.body.status || job.status;

    await job.save();

    res.status(200).json(job);
});

export const deleteJob = asyncWrapper(async (req, res) => {
    const job = await Job.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.userId
    });

    if (!job) {
        throw new AppError("Job not found", 404);
    }

    res.status(200).json({ message: "Job deleted successfully" })
})