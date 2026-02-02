import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/api';
import FloatingEmojis from '../components/FloatingEmojis';
import Footer from '../components/Footer';
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    anniversaryDate: '',
    herName: '',
    herDateOfBirth: '',
    herBio: '',
    herFavoriteQuote: '',
    hisName: '',
    hisDateOfBirth: '',
    hisBio: '',
    hisFavoriteQuote: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.anniversaryDate || !formData.herName || !formData.herDateOfBirth) {
        setError('Please fill in all required fields');
        return;
      }
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.hisName || !formData.hisDateOfBirth) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await signup(formData);

      if (response.success) {
        // Store coupleId in sessionStorage
        sessionStorage.setItem('coupleId', response.coupleId);
        // Show success message
        alert('Welcome to Love Dashboard! 💕');
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError('Unable to register. Please try again later.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <FloatingEmojis />
      <div className="signup-card">
        <div className="signup-header">
          <h1>💕 Create Your Love Dashboard</h1>
          <p>Step {step} of 2</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNextStep} className="signup-form">
            <h3>Anniversary & Her Details</h3>
            
            <div className="form-group">
              <label htmlFor="anniversaryDate">Your Anniversary Date *</label>
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
              <label htmlFor="herName">Her Name *</label>
              <input
                type="text"
                id="herName"
                name="herName"
                placeholder="Enter her name"
                value={formData.herName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="herDateOfBirth">Her Date of Birth *</label>
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
              <label htmlFor="herBio">Her Bio (optional)</label>
              <textarea
                id="herBio"
                name="herBio"
                placeholder="A short bio..."
                rows="3"
                value={formData.herBio}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="herFavoriteQuote">Her Favorite Quote (optional)</label>
              <input
                type="text"
                id="herFavoriteQuote"
                name="herFavoriteQuote"
                placeholder="A meaningful quote"
                value={formData.herFavoriteQuote}
                onChange={handleChange}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="signup-button">
              Next: His Details →
            </button>

            <p className="login-link">
              Already have an account? <Link to="/">Login here</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="signup-form">
            <h3>His Details</h3>

            <div className="form-group">
              <label htmlFor="hisName">His Name *</label>
              <input
                type="text"
                id="hisName"
                name="hisName"
                placeholder="Enter his name"
                value={formData.hisName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hisDateOfBirth">His Date of Birth *</label>
              <input
                type="date"
                id="hisDateOfBirth"
                name="hisDateOfBirth"
                value={formData.hisDateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hisBio">His Bio (optional)</label>
              <textarea
                id="hisBio"
                name="hisBio"
                placeholder="A short bio..."
                rows="3"
                value={formData.hisBio}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="hisFavoriteQuote">His Favorite Quote (optional)</label>
              <input
                type="text"
                id="hisFavoriteQuote"
                name="hisFavoriteQuote"
                placeholder="A meaningful quote"
                value={formData.hisFavoriteQuote}
                onChange={handleChange}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="button-group">
              <button type="button" onClick={handlePrevStep} className="back-button">
                ← Back
              </button>
              <button type="submit" className="signup-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create Love Dashboard 💕'}
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;

