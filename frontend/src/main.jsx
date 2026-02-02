import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter} from 'react-router';
import {RouterProvider} from 'react-router/dom'
import App from './App'

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />
  },
])

const rootContainer = document.getElementById('root');

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <RouterProvider router = {appRouter} />
  </React.StrictMode>
)
