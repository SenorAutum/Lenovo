// src/components/HowItWorks.jsx
import React from 'react';

function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <h2 className="section-title">How It Works</h2>
      <div className="features-container">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3 className="feature-title">Discover</h3>
          <p className="feature-description">Find vetted artisans in your area. Browse by skill or location.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3 className="feature-title">Connect</h3>
          <p className="feature-description">Request to learn from an artisan and get accepted into their program.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3 className="feature-title">Learn</h3>
          <p className="feature-description">Gain hands-on skills through a personalized micro-apprenticeship.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;