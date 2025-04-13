import React, { useState } from 'react';
import './Auth.css';

const Login = ({ switchPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    switchPage('Home');
  };

  return (
    <div className="auth-container fade-in">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p className="switch-link" onClick={() => switchPage('Signup')}>
          Don’t have an account? Sign up
        </p>
      </form>
    </div>
  );
};

export default Login;
