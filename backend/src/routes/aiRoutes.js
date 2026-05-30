import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { careerAssistant } from "../controllers/aiController.js";

const router = express.Router();

router.post("/career-assistant", protectedRoute, careerAssistant);

export default router;