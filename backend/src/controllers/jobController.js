import Job from '../models/Job.js';
import AppError from '../utils/errorHandler.js'
import asyncWrapper from '../utils/asyncHandler.js';

export const createJob = asyncWrapper(async (req, res) => {

    const { company, position, status } = req.body;

    // Input Validation
    if (!company || !position) {
        throw new AppError("Company and Position fields are required", 400);
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

    // Filtering
    const queryObject = {
        createdBy: req.userId
    }

    // Status filter
    if (req.query.status) {
        queryObject.status = req.query.status;
    }

    // Search filter
    if (req.query.search) {
        queryObject.$or = [
            { company: { $regex: req.query.search, $options: "i" } },
            { position: { $regex: req.query.search, $options: "i" } }
        ]
    }

    // Sorting
    let sortBy = "-createdAt";

    switch (req.query.sort) {
        case "oldest":
            sortBy = "createdAt";
            break;
        case "a-z":
            sortBy = "company";
            break;
        case "z-a":
            sortBy = "-company";
            break;
        default:
            sortBy = "-createdAt";
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)

    const totalJobs = await Job.countDocuments(queryObject);
    const totalPages = Math.ceil(totalJobs / limit);

    res.status(200).json({
        totalJobs,
        totalPages,
        currentPage: page,
        count: jobs.length,
        jobs
    });
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

export const getJobStats = asyncWrapper(async (req, res) => {
    const stats = await Job.aggregate([
        {
            $match: { createdBy: req.userId }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    const defaultStats = {
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0
    };

    stats.forEach((item) => {
        defaultStats[item._id] = item.count;
    });

    const totalJobs =
        defaultStats.applied +
        defaultStats.interview +
        defaultStats.offer +
        defaultStats.rejected;

    res.status(200).json({
        totalJobs,
        ...defaultStats
    });
});
