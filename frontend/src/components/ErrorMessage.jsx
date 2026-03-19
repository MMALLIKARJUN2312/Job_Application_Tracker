const ErrorMessage = ({ message = "Something went wrong and failed to load data" }) => {
  return (
    <div className="text-red-500 text-center py-10">
      {message}
    </div>
  );
};

export default ErrorMessage;