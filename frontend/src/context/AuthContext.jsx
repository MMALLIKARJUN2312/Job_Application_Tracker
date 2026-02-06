import { createContext, useContext, useState, useEffect } from 'react';
import apiInstance from '../api/axios.js'

// Creating a Context

const AuthContext = createContext(null);

// AuthProvider wraps the entire app and provides the auth state

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore auth state on page reload

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    // Login Function

    const login = async (email, password) => {
        const response = await apiInstance.post("/auth/login", {
            email,
            password
        });

        const { user, token } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        setUser(user);
        setToken(token);
    };

    // Logout Function

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
        logout
    };

    if (loading) {
        return <div>Loading app ...</div>;
    }

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};

// Custom hook to consume auth context

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used with an AuthProvider")
    }

    return context;
}