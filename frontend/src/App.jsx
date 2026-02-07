import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>Job Application Tracker</h1>

      {isAuthenticated && (
        <button onClick={handleLogout}>Logout</button>
      )}

      <hr />
      <Outlet />
    </div>
  );
};

export default App;
