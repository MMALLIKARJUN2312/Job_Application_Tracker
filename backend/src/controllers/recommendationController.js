import { recommendJobs } from "../services/geminiService.js";

export const getRecommendations = async (
  req,
  res
) => {
  try {
    const { skills, jobs } = req.body;

    const recommendations =
      await recommendJobs(skills, jobs);

    res.status(200).json(recommendations);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate recommendations",
    });
  }
};