const ErrorBoundary = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong
      </h2>

      <p className="text-gray-600 mb-6 max-w-md">
        {error.message || "Unexpected error occurred"}
      </p>

      <button
        onClick={resetErrorBoundary}
        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorBoundary;