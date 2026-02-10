import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getJobById, updateJob } from '../api/jobs';

const EditJob = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        const loadJob = async () => {
            try {
                const data = await getJobById(id);
                setCompany(data.company);
                setPosition(data.position);
                setStatus(data.status);
            } catch (error) {
                setError("Failed to load the job details. Please try again");
            } finally {
                setLoading(false);
            }
        };
        loadJob();
    }, [id]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            await updateJob(id, { company, position, status });
            navigate('/jobs');
        } catch (error) {
            setError("Failed to update the job. Please try again");
        }
    }

    if (loading) return <p className='text-gray-600'>Loading Job ...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="max-w-xl bg-white rounded-lg shadow-sm mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-6">Edit Job</h2>

            <form onSubmit={handleFormSubmit} className="space-y-5">
                <input value={company} onChange={(event) => setCompany(event.target.value)} className="w-full border rounded px-4 py-2" required />
                <input value={position} onChange={(event) => setPosition(event.target.value)} className="w-full border rounded px-4 py-2" required />
                <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full border rounded px-4 py-2" required >
                    <option value="Applied">Applied</option>
                    <option value="Interviewed">Interviewed</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <button className="w-full bg-purple-600 text-white rounded hover:bg-purple-600 py-2">Update Job</button>
            </form>
        </div>
    )
}

export default EditJob