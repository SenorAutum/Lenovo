// src/main.jsx - Updated to use the AuthProvider

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // 1. Import the AuthProvider

// Import Pages
import App from './App';
import DiscoverPage from './pages/DiscoverPage';
import ArtisanDashboard from './pages/ArtisanDashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// Import CSS
import './App.css';
import './auth.css';
import './index.css';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/artisans", element: <DiscoverPage /> },
  { path: "/dashboard", element: <ArtisanDashboard /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap the entire application with the AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

