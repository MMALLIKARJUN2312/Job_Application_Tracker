import {
  searchResumeContext,
}
from "../rag/vectorSearch.js";

import {
  generateRagAnswer,
}
from "../services/geminiService.js";

export const askResumeAI =
  async (req, res) => {

  const { question } = req.body;

  const chunks =
    await searchResumeContext(
      question
    );

  const context =
    chunks
      .map(
        (chunk) => chunk.content
      )
      .join("\n");

  const answer =
    await generateRagAnswer(
      question,
      context
    );

  return res.json({
    answer,
  });
};