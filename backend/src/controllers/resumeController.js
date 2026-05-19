import fs from "fs";
import pdf from "pdf-parse";

export const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    const parsed = await pdf(dataBuffer);

    const resumeText = parsed.text.toLowerCase();

    // Basic skills list
    const predefinedSkills = [
      "react",
      "node",
      "express",
      "mongodb",
      "javascript",
      "typescript",
      "mysql",
      "tailwindcss",
      "redux",
      "aws",
      "docker",
    ];

    // Extract matched skills
    const matchedSkills = predefinedSkills.filter((skill) =>
      resumeText.includes(skill)
    );

    return res.status(200).json({
      matchedSkills,
      extractedText: resumeText,
    });
  } catch (error) {
    console.error("Resume Parsing Error:", error);

    return res.status(500).json({
      message: "Failed to parse resume",
    });
  }
};

export const calculateMatchScore = async (req, res) => {
  try {
    const { skills, jobs } = req.body;

    if (!skills || !jobs) {
      return res.status(400).json({
        message: "Skills and jobs are required",
      });
    }

    const scoredJobs = jobs.map((job) => {
      let score = 0;

      const searchableText = `
        ${job.company}
        ${job.position}
        ${job.status}
      `.toLowerCase();

      skills.forEach((skill) => {
        if (searchableText.includes(skill.toLowerCase())) {
          score += 20;
        }
      });

      if (score > 100) score = 100;

      return {
        ...job,
        matchScore: score,
      };
    });

    return res.status(200).json(scoredJobs);
  } catch (error) {
    console.error("Match Score Error:", error);

    return res.status(500).json({
      message: "Failed to calculate match scores",
    });
  }
};