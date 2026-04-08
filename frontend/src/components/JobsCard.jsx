import React from "react";

const JobCard = React.memo(({ job, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition p-5">
      <h3 className="text-lg font-bold">{job.company}</h3>
      <p className="font-semibold mt-1">{job.position}</p>

      <span className="inline-block text-xs capitalize font-medium rounded-full bg-purple-600 text-white px-3 py-2 mt-4">
        {job.status}
      </span>

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