import { Outlet, useNavigate } from 'react-router'
import { useAuth } from './hooks/useAuth.jsx';
import ToggleTheme from "../components/ToggleTheme";

const App = () => {

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 m-4">

          <h1 className="text-3xl font-extrabold text-purple-600">
            Job Application Tracker
          </h1>

          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <ToggleTheme />
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition px-4 py-2"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App;