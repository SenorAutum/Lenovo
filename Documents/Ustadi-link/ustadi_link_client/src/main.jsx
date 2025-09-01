// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import DiscoverPage from './pages/DiscoverPage';
import ArtisanDashboard from './pages/ArtisanDashboard'; // Import the new dashboard page
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/artisans",
    element: <DiscoverPage />,
  },
  {
    path: "/dashboard", // Add the new route
    element: <ArtisanDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);