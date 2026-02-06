import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import Jobs from './pages/Jobs'
import App from './App'

const Login = () => <h2>Login Page</h2>

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        index : true,
        element : <Navigate to = "jobs" replace />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path : "jobs",
        element : (
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

const rootContainer = document.getElementById('root');

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </React.StrictMode>
)
