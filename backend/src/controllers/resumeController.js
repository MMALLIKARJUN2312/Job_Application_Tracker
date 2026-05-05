import fs from "fs";
import pdf from "pdf-parse";

export const parseResume = async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdf(dataBuffer);

    const text = data.text.toLowerCase();

    // simple skill extraction
    const skills = ["react", "node", "mongodb", "express", "javascript"];
    const matchedSkills = skills.filter(skill => text.includes(skill));

    res.json({
      extractedText: text,
      matchedSkills,
    });
  } catch (err) {
    res.status(500).json({ message: "Resume parsing failed" });
  }
};