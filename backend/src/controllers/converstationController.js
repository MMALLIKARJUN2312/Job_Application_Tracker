import Conversation from "../models/Conversation.js";

export const getConversationHistory = async (
  req,
  res
) => {
  const conversations =
    await Conversation.find({
      userId: req.userId,
      resumeId: req.params.resumeId,
    }).sort({
      createdAt: 1,
    });

  res.status(200).json(conversations);
};