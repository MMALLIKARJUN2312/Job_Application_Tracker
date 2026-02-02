import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from './context/AuthContext'
import App from './App'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />
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
