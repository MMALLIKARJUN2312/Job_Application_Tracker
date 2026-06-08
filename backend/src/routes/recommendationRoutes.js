import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();

router.post(
  "/",
  protectedRoute,
  getRecommendations
);

export default router;