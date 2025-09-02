// src/components/Hero.jsx - Updated
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-headline">Learn a Real Skill. Build Your Future.</h1>
        <p className="hero-subheadline">
          UstadiLink connects you with expert local artisans for hands-on training and apprenticeships.
        </p>
        <div className="hero-buttons">
          <Link to="/artisans" className="btn btn-primary">Find a Mentor</Link>
          {/* This now correctly links to the sign-up page */}
          <Link to="/signup" className="btn btn-secondary">Share Your Skill</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;