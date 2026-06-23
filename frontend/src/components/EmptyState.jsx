import { Link } from "react-router";

const EmptyState = () => {
  return (
    <div className="text-center py-20">

      <div className="text-6xl mb-6">
        💼
      </div>

      <h2 className="text-2xl font-bold mb-3">
        No Jobs Found
      </h2>

      <p className="text-gray-500 mb-6">
        Start tracking your applications
      </p>

      <Link
        to="/jobs/new"
        className="bg-purple-600 text-white px-6 py-3 rounded-lg"
      >
        Add First Job
      </Link>

    </div>
  );
};

export default EmptyState;