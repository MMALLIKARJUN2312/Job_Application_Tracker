import express from "express";
import { askResumeAI } from "../controllers/ragController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask", protectedRoute, askResumeAI);

export default router;
