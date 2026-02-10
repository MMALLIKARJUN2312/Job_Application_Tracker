import {useState} from 'react'
import {useNavigate} from 'react-router'
import {createJob} from '../api/jobs';

const CreateJob = () => {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(""); 

    try {
      setLoading(true);
      await createJob({company, position, status});
      navigate("/jobs");
    } catch (error) {
      setError("Failed to create the job. Please try again");
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className = "max-w-xl bg-white rounded-lg shadow-sm mx-auto p-8">
      <h2 className = "text-2xl font-semibold text-gray-800 mb-6">
        Add New Job
      </h2>

      {
        error && (
          <p className = "text-red-700 bg-red-100 rounded mb-4 p-3">
            {error}
          </p>
        )
      }

      <form onSubmit = {handleFormSubmit} className = "space-y-5">
        <div>
          <label className = "block text-gray-700 mb-1">Company</label>
          <input type = "text" value = {company} onChange = {(event) => setCompany(event.target.value)} className = "w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none px-4 py-2" required/>
        </div>

        <div>
          <label className = "block text-gray-700 mb-1">Position</label>
          <input type = "text" value = {position} onChange={(event) => setPosition(event.target.value)} className = "w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none px-4 py-2" required/>
        </div>
        <div>
          <label className = "block text-gray-700 mb-1">Status</label>
          <select value = {status} onChange = {(event) => setStatus(event.target.value)} className = "w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none px-4 py-2" required>
             <option value="applied">Applied</option>
             <option value="interview">Interview</option>
             <option value="offer">Offer</option>
             <option value="rejected">Rejected</option>
          </select>
        </div>

        <button type = "submit" disabled={loading} className = "w-full text-white bg-purple-600 font-semibold rounded-lg hover:bg-purple-700 transition disabled:opacity-60 py-2">
          {loading ? "Creating a job ..." : "Create job"}
        </button>
      </form>
    </div>
  )

}

export default CreateJob;