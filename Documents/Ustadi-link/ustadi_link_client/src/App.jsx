// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks'; // Import the new component
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <HowItWorks /> {/* Add the new component here */}
    </div>
  );
}

export default App;