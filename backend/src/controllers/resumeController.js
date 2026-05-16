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