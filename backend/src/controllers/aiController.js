import { askCareerAssistant } from "../services/geminiService.js";

export const careerAssistant = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const answer = await askCareerAssistant(question);

    return res.status(200).json({
      answer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate response",
    });
  }
};