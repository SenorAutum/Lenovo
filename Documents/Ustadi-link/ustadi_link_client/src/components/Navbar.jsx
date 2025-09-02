// src/components/Navbar.jsx - Updated
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the custom hook

function Navbar() {
  const { user, signOut } = useAuth(); // Get user and signOut function

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">UstadiLink 🛠️</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/artisans">Find a Mentor</Link></li>
        
        {/* Conditional rendering based on user login status */}
        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={signOut} className="navbar-logout-btn">Log Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Share Your Skill</Link></li>
            <li><Link to="/login" className="navbar-login-btn">Log In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
