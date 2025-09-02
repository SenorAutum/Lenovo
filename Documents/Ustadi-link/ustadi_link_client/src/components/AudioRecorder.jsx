// src/components/AudioRecorder.jsx
import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

function AudioRecorder() {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  // This function will be called when recording stops
  const handleStop = async (blobUrl, blob) => {
    setIsTranscribing(true);
    setAiResponse(null);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');

    try {
      // Send the audio file to our backend server
      const response = await fetch('http://localhost:5001/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setAiResponse(data); // Save the AI's structured response

    } catch (error) {
      console.error('Error sending audio to server:', error);
      setAiResponse({ error: 'Failed to connect to the AI service.' });
    } finally {
      setIsTranscribing(false);
    }
  };

  const { status, startRecording, stopRecording, mediaBlobUrl } = 
    useReactMediaRecorder({ audio: true, onStop: handleStop });

  return (
    <div>
      <p style={{ fontWeight: 'bold' }}>Status: {status}</p>

      {status !== 'recording' ? (
        <button onClick={startRecording} disabled={isTranscribing} className="btn btn-primary">Start Recording</button>
      ) : (
        <button onClick={stopRecording} className="btn btn-secondary">Stop Recording</button>
      )}

      {isTranscribing && <p>🧠 AI is thinking...</p>}

      {/* This will display the final structured response from the AI */}
      {aiResponse && (
        <div className="ai-response">
          <h3>AI Generated Skill Module:</h3>
          <strong>Title:</strong> {aiResponse.title}
          <br/>
          <strong>Materials:</strong>
          <ul>
            {aiResponse.materials?.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <strong>Steps:</strong>
          <ol>
            {aiResponse.steps?.map((item, index) => <li key={index}>{item}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
// Note: Ensure you have the necessary CSS classes (like btn, btn-primary, etc.) defined in your stylesheets for proper styling.