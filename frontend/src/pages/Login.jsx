import {useState} from 'react';
import {useNavigate} from 'react-router'
import {useAuth} from '../context/AuthContext';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            setLoading(true);
            await login(email, password);
            navigate("/jobs", {replace :true});
        } catch (error) {
            setError("Login Failed. Please check your credentials");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className = "min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className = "bg-white w-full max-w-md rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>

                {error && (
                    <p className = "bg-red-100 text-red-700 text-sm rounded p-3 mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit = {handleSubmit} className = "space-y-5">
                    <div>
                        <label className = "block text-gray-700 mb-2">Email</label>
                        <input type = "email" value = {email} onChange = {(event) => setEmail(event.target.value)} className = "w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2" autoComplete='off' required/>
                    </div>
                    <div>
                        <label className = "block text-gray-700 mb-2">Password</label>
                        <input type = "password" value = {password} onChange = {(event) => setPassword(event.target.value)} className = "w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2" required/>
                    </div>
                    <button type = "submit" disabled = {loading} className = "w-full bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-60 py-2">
                        {loading ? "Logging in ..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;