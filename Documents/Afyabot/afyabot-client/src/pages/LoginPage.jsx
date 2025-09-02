// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="login-page-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue your wellness journey</p>
        <form className="login-form">
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          {/* In a real app, this would perform authentication. Here, it just navigates. */}
          <Link to="/dashboard" className="btn btn-primary login-btn">
            Log In
          </Link>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
