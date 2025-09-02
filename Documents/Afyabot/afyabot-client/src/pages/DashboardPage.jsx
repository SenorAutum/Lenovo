// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// REMOVED the old flutterwave import

// ... (keep the initialMoodData and formatYAxis functions as they are)
const initialMoodData = [
  { day: 'Mon', mood: 2 }, { day: 'Tue', mood: 0 }, { day: 'Wed', mood: 2 }, { day: 'Thu', mood: 1 },
];
const formatYAxis = (tickItem) => ['😔', '😐', '😊'][tickItem] || '';


function DashboardPage() {
    // ... (The main DashboardPage component structure remains the same)
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="sidebar-header">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h2>AfyaBot</h2>
        </div>
        <ul className="sidebar-nav">
          <li className="active"><a href="#">Dashboard</a></li>
          <li><a href="#">Mindfulness Exercises</a></li>
          <li><a href="#">Health Info</a></li>
          <li><a href="#">Find a Professional</a></li>
        </ul>
        <div className="sidebar-footer">
          <Link to="/" className="logout-btn">Log Out</Link>
        </div>
      </nav>
      <main className="main-content-area">
        <header className="main-header">
          <h1>Good Morning, Brandon</h1>
          <p>Here's a look at your wellness journey. Let's continue to grow.</p>
        </header>
        <div className="content-grid">
          <JournalChat />
          <div className="right-column">
            <MoodChart />
            <PremiumOffer />
          </div>
        </div>
      </main>
    </div>
  );
}

// ... (Keep the JournalChat and MoodChart components exactly as they were)
function JournalChat() {
    const [messages, setMessages] = useState([{ from: 'bot', text: "Welcome! How are you feeling today?" }]);
    const [userInput, setUserInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef(null);
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        const newUserMessage = { from: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsThinking(true);
        try {
            const response = await fetch('http://localhost:5002/api/analyze-sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ journalEntry: userInput }),
            });
            const data = await response.json();
            const newBotMessage = { from: 'bot', text: data.summary };
            setMessages(prev => [...prev, newBotMessage]);
        } catch (error) {
            const errorMessage = { from: 'bot', text: "Sorry, I'm having trouble connecting." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsThinking(false);
        }
    };
    return (
        <div className="journal-chat-container">
            <div className="chat-area">
                {messages.map((msg, index) => (
                  <div key={index} className={`chat-bubble-wrapper ${msg.from}`}>
                    <div className="chat-bubble">{msg.text}</div>
                  </div>
                ))}
                {isThinking && <div className="chat-bubble-wrapper bot"><div className="chat-bubble typing"><span></span><span></span><span></span></div></div>}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="input-form">
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Tell me about your day..." className="chat-input" />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
}
function MoodChart() {
    return (
        <div className="mood-chart-container">
            <h3 className="widget-title">Your Mood This Week</h3>
            <ResponsiveContainer width="100%" height={150}>
                <LineChart data={initialMoodData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis domain={[0, 2]} ticks={[0, 1, 2]} tickFormatter={formatYAxis} tick={{ fontSize: 20 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#27ae60" strokeWidth={3} activeDot={{ r: 8 }} dot={{r: 5}} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// --- NEW Flutterwave Premium Offer Component ---
function PremiumOffer() {
    function handlePayment() {
        FlutterwaveCheckout({
            public_key: 'FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxxx-X', // Use your Flutterwave TEST public key
            tx_ref: "afyabot-" + Date.now(),
            amount: 500,
            currency: 'KES',
            payment_options: 'card, mobilemoneykenya',
            redirect_url: '', // Optional: URL to redirect to after payment
            customer: {
                email: 'testuser@gmail.com',
                phone_number: '0712345678',
                name: 'Test User',
            },
            customizations: {
                title: 'AfyaBot Premium',
                description: 'Unlock Your Full Wellness Potential',
                logo: 'https://i.imgur.com/81Va6yN.png',
            },
        });
    }

    return (
        <div className="premium-offer-container">
            <h3 className="widget-title">Go Premium ✨</h3>
            <p>Unlock guided meditation, advanced analytics, and more.</p>
            <button
                className="btn btn-primary premium-btn"
                onClick={handlePayment}
            >
                Upgrade for KES 500
            </button>
        </div>
    );
}

export default DashboardPage;