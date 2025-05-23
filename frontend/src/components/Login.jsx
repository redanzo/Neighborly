import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import localforage from 'localforage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
  
    if (data.status === 'ok') {
      localStorage.setItem('token', data.user);
      localStorage.setItem('email', email);
      localStorage.setItem('community', data.community);
  
      const userResponse = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          email: email,
        }
      });
  
      const userData = await userResponse.json();
      if (userData.status === 'ok') {
        localStorage.setItem('user', JSON.stringify(userData.user));
      }
  
      
      const postResponse = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          community: data.community,
        }
      });
  
      const postData = await postResponse.json();
  
      if (postData.status === 'ok') {
        localforage.setItem('alerts', JSON.stringify(postData.alerts));
        localStorage.setItem('events', JSON.stringify(postData.events));
        localforage.setItem('lostPets', JSON.stringify(postData.lostPets));
        localforage.setItem('marketplace', JSON.stringify(postData.marketplace));
  
        navigate('/home');
      } else {
        alert('Error: ' + postData.error);
      }
    } else {
      alert('Error: ' + data.error);
    }
  };
  

  return (
    <div className="auth-container fade-in">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate('/')}
      >← Back</button>
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
        <p className="switch-link">
          <Link to="/signup">Don’t have an account? Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;