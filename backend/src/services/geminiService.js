import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const analyzeResumeWithAI = async (resumeText) => {
  const prompt = `
You are an AI career coach.

Analyze this resume and provide:

1. Top strengths
2. Missing skills
3. Recommended job roles
4. Improvement suggestions
5. Career summary

Resume:
${resumeText}

Respond ONLY in JSON format:
{
  "strengths": [],
  "missingSkills": [],
  "recommendedRoles": [],
  "suggestions": [],
  "summary": ""
}
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  return JSON.parse(response.replace(/```json|```/g, "").trim());
};