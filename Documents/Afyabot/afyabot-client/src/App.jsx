// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css'; // This is the crucial line that was missing

// Initial dummy data for our mood chart
const initialMoodData = [
  { day: 'Mon', mood: 2 }, // 2=Positive, 1=Neutral, 0=Negative
  { day: 'Tue', mood: 0 },
  { day: 'Wed', mood: 2 },
  { day: 'Thu', mood: 1 },
];

const formatYAxis = (tickItem) => {
    const labels = ['😔', '😐', '😊'];
    return labels[tickItem] || '';
}

function App() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Welcome! Write a journal entry to see how you're feeling today." }
  ]);
  const [userInput, setUserInput] = useState('');
  const [moodData, setMoodData] = useState(initialMoodData);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { from: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsThinking(true);

    try {
      const response = await fetch('https://afyabot-api.onrender.com/api/analyze-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ journalEntry: userInput }),
      });
      const data = await response.json();
      const newBotMessage = { from: 'bot', text: data.summary };
      setMessages(prev => [...prev, newBotMessage]);

      let newMoodValue = 1;
      if (data.sentiment === 'Positive') newMoodValue = 2;
      if (data.sentiment === 'Negative') newMoodValue = 0;

      const newEntry = { day: 'Fri', mood: newMoodValue };
      setMoodData(prev => [...prev, newEntry]);

    } catch (error) {
      console.error("Error connecting to AI:", error);
      const errorMessage = { from: 'bot', text: "Sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="app-container">
      <div className="mobile-mockup">
        <header className="app-header">
            <div className="header-logo">
                <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h1>AfyaBot</h1>
            </div>
        </header>

        <main className="main-content">
          <div className="chart-container">
            <h2 className="chart-title">Your Mood This Week</h2>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={moodData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis domain={[0, 2]} ticks={[0, 1, 2]} tickFormatter={formatYAxis} tick={{ fontSize: 20 }} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#27ae60" strokeWidth={3} activeDot={{ r: 8 }} dot={{r: 5}} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chat-area">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble-wrapper ${msg.from}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            {isThinking && 
                <div className="chat-bubble-wrapper bot">
                    <div className="chat-bubble typing"><span></span><span></span><span></span></div>
                </div>
            }
            <div ref={chatEndRef} />
          </div>
        </main>

        <footer className="footer-input">
          <form onSubmit={handleSendMessage} className="input-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="How was your day?"
              className="chat-input"
            />
            <button type="submit" className="send-button">
              <svg xmlns="http://www.w.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.826L11.25 9.75l-7.407-2.61a.75.75 0 00-.738-.851z" /><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.826L11.25 9.75v.002l-7.407 2.61a.75.75 0 00.738.851l7.407-2.61a.75.75 0 00.826-.95L3.93 3.239a.75.75 0 00-.826-.95z" /></svg>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}

export default App;