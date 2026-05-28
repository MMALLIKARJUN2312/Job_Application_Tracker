const AIInsightsPanel = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 space-y-6">

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Career Insights
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {analysis.summary}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-green-600 mb-3">
          Strengths
        </h3>

        <div className="flex flex-wrap gap-3">
          {analysis.strengths?.map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-red-500 mb-3">
          Missing Skills
        </h3>

        <div className="flex flex-wrap gap-3">
          {analysis.missingSkills?.map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-purple-600 mb-3">
          Recommended Roles
        </h3>

        <div className="flex flex-wrap gap-3">
          {analysis.recommendedRoles?.map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-yellow-600 mb-3">
          Suggestions
        </h3>

        <div className="space-y-3">
          {analysis.suggestions?.map((item, index) => (
            <div
              key={index}
              className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 text-sm text-yellow-800 dark:text-yellow-300"
            >
              ⚠ {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;