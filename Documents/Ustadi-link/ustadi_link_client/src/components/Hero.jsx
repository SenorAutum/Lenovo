// src/components/Hero.jsx
import React from 'react';

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-headline">Learn a Real Skill. Build Your Future.</h1>
        <p className="hero-subheadline">
          UstadiLink connects you with expert local artisans for hands-on training and apprenticeships.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Find a Mentor</button>
          <button className="btn btn-secondary">Share Your Skill</button>
        </div>
      </div>
    </div>
  );
}

// This is the crucial line that was likely missing.
// It makes the component available to be imported by other files.
export default Hero;