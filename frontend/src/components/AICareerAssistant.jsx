import { useState } from "react";
import apiInstance from "../api/axios";
import toast from "react-hot-toast";

const AICareerAssistant = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const response = await apiInstance.post(
        "/ai/career-assistant",
        {
          question,
        }
      );

      setAnswer(response.data.answer);
    } catch {
      toast.error("Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        AI Career Assistant
      </h2>

      <textarea
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask career-related questions..."
        className="w-full p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border dark:border-gray-700">
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default AICareerAssistant;