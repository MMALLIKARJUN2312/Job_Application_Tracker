import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import App from './App'

const Login = () => <h2>Login Page</h2>
const Dashboard = () => <h2>Dashboard</h2>

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path : "/",
    element : (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  }
])

const rootContainer = document.getElementById('root');

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </React.StrictMode>
)
