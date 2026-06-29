import { searchResumeContext } from "../rag/vectorSearch.js";
import { generateRagAnswer } from "../services/geminiService.js";
import Conversation from "../models/Conversation.js";

export const askResumeAI = async (req, res) => {
  const { question } = req.body;

  const chunks = await searchResumeContext(question);

  const context = chunks.map((chunk) => chunk.content).join("\n");

  const answer = await generateRagAnswer(question, context);

  await Conversation.create({
    userId: req.userId,
    resumeId,
    question,
    answer,
  });

  return res.json({
    answer,
  });
};
