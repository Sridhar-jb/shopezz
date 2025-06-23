import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/login', {
        email,
        password
      });
      alert(res.data.message);
    } catch (err) {
      // Check if the error response exists and set a specific error message
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed!');
      } else {
        setError('Login failed! Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
