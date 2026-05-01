const InsightsPanel = ({ stats }) => {
  if (!stats) return null;

  const successRate =
    stats.totalJobs > 0
      ? ((stats.offer / stats.totalJobs) * 100).toFixed(1)
      : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Insights
      </h3>

      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <li>📊 Total Applications: {stats.totalJobs}</li>
        <li>🎯 Success Rate: {successRate}%</li>

        {stats.rejected > stats.offer && (
          <li className="text-red-500">
            ⚠️ More rejections than offers — improve targeting
          </li>
        )}

        {stats.interview > 0 && (
          <li className="text-green-500">
            ✅ You're getting interviews — keep going!
          </li>
        )}
      </ul>
    </div>
  );
};

export default InsightsPanel;