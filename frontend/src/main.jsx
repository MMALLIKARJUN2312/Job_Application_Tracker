import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import { JobsProvider } from './context/JobsContext';
import ProtectedRoute from './routes/ProtectedRoute'
import Jobs from './pages/Jobs'
import Login from './pages/Login'
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App'
import './index.css'

const queryClient = new QueryClient();

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="jobs" replace />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "jobs",
        element: (
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs/new",
        element: (
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs/:id/edit",
        element: (
          <ProtectedRoute>
            <EditJob />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

const rootContainer = document.getElementById('root');

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
