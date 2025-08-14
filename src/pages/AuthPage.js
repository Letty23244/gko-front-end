// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api/Api'; // ✅ Import the centralized API service
import './auth.css'; // Assuming you have a CSS file for styling

const AuthPage = () => {
  const [email, setEmail] = useState(''); // Keep these empty for user input
  const [password, setPassword] = useState(''); // Keep these empty for user input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ✅ Use api.admin.login from the centralized API service
      const res = await api.admin.login({
        emailAddress: email,
        password: password,
      });

      if (res.success) {
        // The backend returns the admin data nested under 'admin' key
        const adminData = res.data.admin; 
        
        // Store tokens and user role using localStorage
        localStorage.setItem("accessToken", adminData.access_token);
        localStorage.setItem("refreshToken", adminData.refresh_token);
        localStorage.setItem("userRole", adminData.role || "admin");
        
        // Redirect to the dashboard on successful login
        navigate('/dashboard'); 
      } else {
        // Display error message from the API response
        setError(res.error.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Fallback error message for unexpected issues
      setError('An unexpected error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-modal">
        <h2 className="auth-header">Admin Login</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="auth-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="auth-input"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
