const RecommendedRoles = ({
  recommendations,
}) => {
  if (!recommendations) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        AI Recommended Roles
      </h2>

      <div className="space-y-4">

        {recommendations.recommendedRoles?.map(
          (role) => (
            <div
              key={role}
              className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border"
            >
              ⭐ {role}
            </div>
          )
        )}

      </div>

      <div className="mt-6">

        <h3 className="font-semibold mb-2">
          Career Path
        </h3>

        <p>
          {recommendations.careerPath}
        </p>

      </div>
    </div>
  );
};

export default RecommendedRoles;