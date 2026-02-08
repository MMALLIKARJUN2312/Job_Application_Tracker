import { useState, useEffect } from 'react';
import { fetchJobs } from '../api/getJobs';

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
            <div className = "text-gray-500 text-center py-10">
                No Jobs found. 
            </div>
        )
    }

    return (
        <div>
            <h2 className='text-2xl font-semibold m-6'>Your Job Applications</h2>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 m-6'>
                {
                    jobs.map((job) => (
                        <div key={job._id} className = "bg-white rounded-lg border shadow-sm hover:shadow-md transition p-5">
                            <h3 className='text-lg font-bold'>{job.company}</h3>
                            <p className = "font-semibold mt-1">{job.position}</p>
                            <span className = "inline-block text-xs capitalize font-medium rounded-full bg-purple-600 text-white px-3 py-2 mt-4">{job.status}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Jobs;
