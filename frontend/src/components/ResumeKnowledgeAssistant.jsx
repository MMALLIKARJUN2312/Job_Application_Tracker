import { useRef, useEffect, useState } from "react";
import apiInstance from "../api/axios";
import toast from "react-hot-toast";


const ResumeKnowledgeAssistant = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await apiInstance.post(
        "/rag/ask",
        {
          question,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);

      setQuestion("");
    } catch (error) {
      toast.error("Failed to fetch AI response", error.message);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "What skills am I missing?",
    "Which role suits me best?",
    "How can I improve my resume?",
    "What projects should I build next?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm p-6">

      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Resume Knowledge Assistant
      </h2>

      <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-900">

        {messages.length === 0 && (
          <p className="text-gray-500">
            Ask questions about your resume...
          </p>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.role === "user"
              ? "text-right"
              : "text-left"
              }`}
          >
            <div
              className={`inline-block px-4 py-3 rounded-lg max-w-[80%]
              ${message.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />

      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => setQuestion(item)}
            className="text-sm px-3 py-2 rounded-full border"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          placeholder="Ask something..."
          className="flex-1 border rounded-lg px-4 py-3 dark:bg-gray-900 dark:text-white"
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="bg-purple-600 text-white px-5 py-3 rounded-lg"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ResumeKnowledgeAssistant;