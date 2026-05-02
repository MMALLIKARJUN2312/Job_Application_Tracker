import React from "react";
import StatusTimeline from "./StatusTimeline";

const JobCard = React.memo(({ job, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition p-5"> 
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.company}</h3>
      <p className="font-semibold mt-1 text-gray-600 dark:text-gray-300">{job.position}</p>

      <span className="inline-block text-xs capitalize font-medium rounded-full bg-purple-600/90 dark:bg-purple-500 text-white px-3 py-1.5 mt-4">
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