import React, { useState } from 'react';
import './Auth.css';

const Login = ({ switchPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    const response = fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.status == 'ok') {
      localStorage.setItem('token', data.user);
      alert('Login successful!');
      switchPage('Home');
    }
    else {
      alert('Error: ' + data.error);
    }
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
