const StatusTimeline = ({ status }) => {
  const steps = ["applied", "interview", "offer"];

  return (
    <div className="flex gap-2 mt-3">
      {steps.map((step) => (
        <span
          key={step}
          className={`px-2 py-1 text-xs rounded-full ${
            step === status
              ? "bg-purple-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500"
          }`}
        >
          {step}
        </span>
      ))}
    </div>
  );
};

export default StatusTimeline;