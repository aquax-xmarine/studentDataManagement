import React, { useState } from 'react';
import '../styles/Login.css'; // We will create this stylesheet next

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend authentication API later
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Student Data Management</h2>
        <p className="subtitle">Sign in to manage your classroom records</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required 
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;