import express from "express";
import multer from "multer";
import {
  parseResume,
  calculateMatchScore,
} from "../controllers/resumeController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Temporary uploads folder
const upload = multer({
  dest: "uploads/",
});

router.post("/upload", protectedRoute, upload.single("resume"), parseResume);
router.post("/match-score", protectedRoute, calculateMatchScore);

export default router;
