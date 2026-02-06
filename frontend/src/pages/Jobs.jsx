import {useState, useEffect} from 'react';
import {fetchJobs} from '../api/getJobs';

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
                    limit : 10,
                    status,
                    sort
                });
                setJobs(data.jobs || []);
            } catch (error) {
                setError("Failed to load the jobs");
            } finally {
                setLoading(false);
            }
        }
        loadJobs(); 
    }, [page, status, sort]);

    if (loading) return <p>Loading jobs ... </p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h2>Jobs</h2>
            <ul>
                {
                    jobs.map((job) => (
                        <li key = {job._id}>
                            {job.company} - {job.position} ({job.status})
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Jobs;
