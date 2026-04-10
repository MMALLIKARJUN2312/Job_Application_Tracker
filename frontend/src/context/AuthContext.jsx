import { createContext, useState} from 'react';
import apiInstance from '../api/axios.js'

// Creating a Context
const AuthContext = createContext(null);

// AuthProvider wraps the entire app and provides the auth state
export const AuthProvider = ({ children }) => {
  // Lazy initialization (fixes useEffect issue)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [loading] = useState(false); 

  // Login
  const login = async (email, password) => {
    const response = await apiInstance.post("/auth/login", {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setUser(user);
    setToken(token);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

