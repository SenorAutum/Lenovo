// src/components/Navbar.jsx
import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">UstadiLink 🛠️</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/artisans">Find a Mentor</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/share-skill">Share Your Skill</a></li>
        <li><a href="/login" className="navbar-login-btn">Log In</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
