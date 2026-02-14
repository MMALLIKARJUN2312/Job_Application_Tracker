import express from 'express';
import { createJob, getAllJobs, updateJob, deleteJob } from './../controllers/jobController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protectedRoute, createJob)
    .get(protectedRoute, getAllJobs);
router.route('/:id')
    .put(protectedRoute, updateJob)
    .delete(protectedRoute, deleteJob);

router.get("/stats", protectedRoute, getJobStats);
router.route("/:id")

export default router;