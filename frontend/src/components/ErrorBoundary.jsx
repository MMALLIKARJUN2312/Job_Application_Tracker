const ErrorBoundary = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        Something went wrong
      </h2>

      <p className="text-gray-600 mb-6">
        {error.message}
      </p>

      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-purple-600 text-white rounded-md"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorBoundary;