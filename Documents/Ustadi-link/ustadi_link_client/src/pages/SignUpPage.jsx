// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function SignUpPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('learner'); // 'learner' or 'artisan'
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    role: userType,
                }
            }
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Success! Please check your email to verify your account.');
            // In a real app, you'd wait for verification. For the hackathon, we can proceed.
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Create Your Account</h2>
                <p className="auth-subtitle">Join the UstadiLink community</p>
                <form onSubmit={handleSignUp}>
                    <div className="user-type-toggle">
                        <button type="button" onClick={() => setUserType('learner')} className={userType === 'learner' ? 'active' : ''}>I'm a Learner</button>
                        <button type="button" onClick={() => setUserType('artisan')} className={userType === 'artisan' ? 'active' : ''}>I'm an Artisan</button>
                    </div>
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Create a Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {message && <p className="success-message">{message}</p>}
                    <button type="submit" className="btn-auth" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
                </form>
                <p className="auth-link">Already have an account? <Link to="/login">Log In</Link></p>
            </div>
        </div>
    );
}

export default SignUpPage;
