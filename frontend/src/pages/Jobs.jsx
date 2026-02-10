import { useState, useEffect } from 'react';
import { fetchJobs } from '../api/getJobs';
import { Link } from 'react-router'
import { deleteJob } from '../api/jobs';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("latest")

    useEffect(() => {
        const loadJobs = async () => {
            try {
                setLoading(true);
                const data = await fetchJobs({
                    page,
                    limit: 10,
                    status,
                    sort
                });
                setJobs(data.jobs || []);
            } catch (error) {
                setError("Failed to load the jobs. Please try again");
            } finally {
                setLoading(false);
            }
        }
        loadJobs();
    }, [page, status, sort]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want toi delete the job?");

        if (!confirmed) return;

        try {
            await deleteJob(id);
            setJobs((previousJobs) => previousJobs.filter((job) => job._id !== id));
        } catch (error) {
            setError("Failed to delete the job. Please try again")
        }

    }

    if (loading) {
        return (
            <div className='text-gray-500 text-center py-10'>
                Loading jobs ...
            </div>
        )
    }
    if (error) {
        return (
            <div className='text-red-500 text-center py-10'>
                {error}
            </div>
        )
    }

    if (jobs.length === 0) {
        return (
            <div className="text-gray-500 text-center py-10">
                No Jobs found.
            </div>
        )
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-semibold m-6'>Your Job Applications</h2>
                <Link
                    to="/jobs/new"
                    className="inline-block mx-4 mb-6 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
                >
                    + Add Job
                </Link>
            </div>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 m-6'>
                {
                    jobs.map((job) => (
                        <div key={job._id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition p-5">
                            <h3 className='text-lg font-bold'>{job.company}</h3>
                            <p className="font-semibold mt-1">{job.position}</p>
                            <span className="inline-block text-xs capitalize font-medium rounded-full bg-purple-600 text-white px-3 py-2 mt-4">{job.status}</span>

                            <div className = "flex gap-4 mt-4">
                                <Link to = {`/jobs/${job._id}/edit`} className = "text-sm text-purple-600 hover:underline">Edit</Link>
                                <button onClick = {() => handleDelete(job._id)} className = "text-sm tex-red-500 hover:underline">Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Jobs;
