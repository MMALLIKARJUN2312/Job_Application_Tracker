import React from "react";
import StatusTimeline from "./StatusTimeline";

const JobCard = React.memo(({ job, onDelete }) => {
  return (
    <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"> 
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.company}</h3>
      <p className="font-semibold mt-1 text-gray-600 dark:text-gray-300">{job.position}</p>

      <span className="inline-block text-xs capitalize font-medium rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:bg-purple-500 text-white px-3 py-1.5 mt-4">
        {job.status}
      </span>
      <StatusTimeline status={job.status} />

      <div className="flex gap-4 mt-4">
        <a href={`/jobs/${job._id}/edit`} className="text-sm text-purple-600 hover:underline">
          Edit
        </a>
        <button
          onClick={() => onDelete(job._id)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default JobCard;