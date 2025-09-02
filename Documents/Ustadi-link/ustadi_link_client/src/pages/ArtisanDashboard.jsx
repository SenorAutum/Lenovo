import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function ArtisanDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // --- FLUTTERWAVE PAYMENT HANDLER ---
  function handlePayment() {
    FlutterwaveCheckout({
      public_key: 'FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxxx-X', // PASTE YOUR FLUTTERWAVE TEST KEY HERE
      tx_ref: "ustadilink-" + Date.now(),
      amount: 500,
      currency: 'KES',
      payment_options: 'card, mobilemoneykenya',
      customer: {
        email: user?.email || 'testlearner@gmail.com',
        name: 'Test Learner',
      },
      customizations: {
        title: 'UstadiLink Connection Fee',
        description: 'Payment for apprenticeship connection',
        logo: 'https://i.imgur.com/81Va6yN.png', // A placeholder logo
      },
      callback: function (data) {
        console.log("Payment successful", data);
        alert("Payment Successful! Your connection is confirmed.");
      },
      onclose: function() {
        console.log("Payment modal closed.");
      }
    });
  }

  // --- The existing audio recorder logic ---
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState('');
  const handleStop = async (blobUrl, blob) => {
    setIsTranscribing(true);
    setError('');
    setAiResponse(null);
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');
    try {
      const response = await fetch('http://localhost:5001/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) { throw new Error('AI service error.'); }
      const data = await response.json();
      setAiResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsTranscribing(false);
    }
  };
  const { status, startRecording, stopRecording } = useReactMediaRecorder({ audio: true, onStop: handleStop });
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="dashboard-page-container">
      <header className="dashboard-header">
        <h2>Artisan Dashboard</h2>
        <button onClick={handleLogout} className="btn-secondary">Log Out</button>
      </header>
      <div className="dashboard-content">
        
        {/* Payment Section - ADDED */}
        <div className="action-card-large" style={{marginBottom: '2rem'}}>
            <h3>Finalize Apprenticeship</h3>
            <p>A learner has accepted your offer. Collect the KES 500 connection fee to finalize the apprenticeship.</p>
            <button onClick={handlePayment} className="btn-primary">
              Pay Connection Fee
            </button>
        </div>

        {/* AI Recorder Section */}
        <div className="action-card-large">
          <h3>Create a New Skill Module</h3>
          <p>Record a short audio clip explaining a task. Our AI will do the rest.</p>
          <div className="recorder-controls">
            <p>Status: <strong>{status}</strong></p>
            {status !== 'recording' ? (
              <button onClick={startRecording} disabled={isTranscribing} className="btn-primary">Start Recording</button>
            ) : (
              <button onClick={stopRecording} className="btn-danger">Stop Recording</button>
            )}
          </div>
          {isTranscribing && <p className="loading-message">🧠 AI is processing...</p>}
          {error && <p className="error-message">{error}</p>}
          {aiResponse && (
            <div className="ai-response-box">
              <h4>AI Generated Skill Module:</h4>
              <p><strong>Title:</strong> {aiResponse.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtisanDashboard;

