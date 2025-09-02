// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="background-image"></div>
      <div className="content">
        <h1 className="title">Your Mind, Your Sanctuary</h1>
        <h2 className="subtitle">Introducing <span className="highlight">AfyaBot</span></h2>
        <p className="description">
          Empowering young Africans with private, AI-powered mental wellness support.
        </p>
        <div className="button-group">
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
