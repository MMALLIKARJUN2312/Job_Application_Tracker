const MatchScorePanel = ({ jobs }) => {
  if (!jobs?.length) return null;

  return (
    <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
      
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
        AI Match Scores
      </h2>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {job.position}
                </h3>

                <p className="text-sm text-gray-500">
                  {job.company}
                </p>
              </div>

              <div
                className={`
                  px-4 py-2 rounded-full text-sm font-bold
                  ${
                    job.matchScore >= 70
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : job.matchScore >= 40
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }
                `}
              >
                {job.matchScore}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchScorePanel;