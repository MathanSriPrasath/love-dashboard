import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import FloatingEmojis from '../components/FloatingEmojis';
import Footer from '../components/Footer';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    anniversaryDate: '',
    herDateOfBirth: '',
    hisDateOfBirth: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(
        formData.anniversaryDate,
        formData.herDateOfBirth,
        formData.hisDateOfBirth
      );

      if (response.success) {
        // Store coupleId in sessionStorage
        sessionStorage.setItem('coupleId', response.coupleId);
        navigate('/dashboard');
      } else {
        setError(response.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <FloatingEmojis />
      <div className="login-card">
        <div className="login-header">
          <h1>💕 Love Dashboard</h1>
          <p>Enter your special dates to unlock</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="anniversaryDate">Anniversary Date</label>
            <input
              type="date"
              id="anniversaryDate"
              name="anniversaryDate"
              value={formData.anniversaryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="herDateOfBirth">Her Date of Birth</label>
            <input
              type="date"
              id="herDateOfBirth"
              name="herDateOfBirth"
              value={formData.herDateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="hisDateOfBirth">His Date of Birth</label>
            <input
              type="date"
              id="hisDateOfBirth"
              name="hisDateOfBirth"
              value={formData.hisDateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Unlocking...' : 'Unlock Dashboard'}
          </button>

          <p className="signup-link">
            New couple? <Link to="/signup">Create your Love Dashboard</Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;

