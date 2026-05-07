import { Outlet, useNavigate } from 'react-router'
import { useAuth } from './hooks/useAuth.jsx';
import ToggleTheme from "./components/ToggleTheme.jsx";

const App = () => {

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black transition-colors duration-300">
      <header className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-center px-6 py-4 m-4">

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
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