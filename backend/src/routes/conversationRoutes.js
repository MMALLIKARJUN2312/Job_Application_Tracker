import express from "express";

import {
  getConversationHistory,
} from "../controllers/conversationController.js";

import {
  protectedRoute,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/:resumeId",
  protectedRoute,
  getConversationHistory
);

export default router;