import { Outlet, useNavigate } from 'react-router'
import { useAuth } from './context/AuthContext'

const App = () => {

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div>
      <header className="bg-white shadow-md flex justify-center items-center px-6 py-4">
        <h1 className="text-3xl font-extrabold text-purple-600">Job Application Tracker</h1>
        {
          isAuthenticated && (
            <button onClick={handleLogout} className="text-sm bg-red-500 text-white rounded hover:bg-red-600 transition px-4 py-2">
              Logout
            </button>
          )
        }
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App;