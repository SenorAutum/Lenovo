// src/pages/ArtisanDashboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import AudioRecorder from '../components/AudioRecorder'; // Import the new component

function ArtisanDashboard() {
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">My Dashboard</h1>
        <div className="action-card">
          <h2>Create a New Skill Module</h2>
          <p>Record a short audio clip explaining a task. Our AI will handle the rest.</p>

          {/* Use the AudioRecorder component here */}
          <AudioRecorder />
        </div>
      </div>
    </div>
  );
}

export default ArtisanDashboard;