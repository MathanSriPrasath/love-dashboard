import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCoupleById, getLoveLetters, getMemories, getImportantDates } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('love-letter');
  const [coupleData, setCoupleData] = useState(null);
  const [loveLetters, setLoveLetters] = useState([]);
  const [memories, setMemories] = useState([]);
  const [importantDates, setImportantDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const coupleId = sessionStorage.getItem('coupleId');
    if (!coupleId) {
      navigate('/');
      return;
    }

    fetchAllData(coupleId);
  }, [navigate]);

  const fetchAllData = async (coupleId) => {
    try {
      setLoading(true);
      const [couple, letters, mems, dates] = await Promise.all([
        getCoupleById(coupleId),
        getLoveLetters(coupleId),
        getMemories(coupleId),
        getImportantDates(coupleId),
      ]);

      setCoupleData(couple);
      setLoveLetters(letters);
      setMemories(mems);
      setImportantDates(dates);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('coupleId');
    navigate('/');
  };

  const openLetterModal = (letter) => {
    setSelectedLetter(letter);
    setIsModalOpen(true);
  };

  const closeLetterModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLetter(null), 300);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Loading your love dashboard...</p>
      </div>
    );
  }

  if (!coupleData) {
    return null;
  }

  return (
    <div className="dashboard">
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <h1 className="dashboard-title">💕 Love Dashboard</h1>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'love-letter' ? 'active' : ''}`}
            onClick={() => setActiveTab('love-letter')}
          >
            Love Letter
          </button>
          <button
            className={`nav-tab ${activeTab === 'memories' ? 'active' : ''}`}
            onClick={() => setActiveTab('memories')}
          >
            Memories
          </button>
          <button
            className={`nav-tab ${activeTab === 'important-dates' ? 'active' : ''}`}
            onClick={() => setActiveTab('important-dates')}
          >
            Important Dates
          </button>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Couple Cards Section */}
        <div className="couple-section">
          {/* Her Card */}
          <div className="person-card her-card">
            <div className="card-header">
              <h2>{coupleData.herName}</h2>
            </div>
            <div className="card-body">
              <p className="birth-date">
                <strong>Born:</strong> {formatDate(coupleData.herDateOfBirth)}
              </p>
              {coupleData.herBio && (
                <p className="bio">{coupleData.herBio}</p>
              )}
              {coupleData.herFavoriteQuote && (
                <p className="quote">"{coupleData.herFavoriteQuote}"</p>
              )}
            </div>
          </div>

          {/* Couple Photo */}
          <div className="couple-photo-container">
            {coupleData.couplePhotoUrl ? (
              <img
                src={coupleData.couplePhotoUrl}
                alt="Couple"
                className="couple-photo"
              />
            ) : (
              <div className="couple-photo-placeholder">
                <span className="heart-icon">❤️</span>
              </div>
            )}
            <p className="anniversary-text">
              Together since {formatDate(coupleData.anniversaryDate)}
            </p>
          </div>

          {/* His Card */}
          <div className="person-card his-card">
            <div className="card-header">
              <h2>{coupleData.hisName}</h2>
            </div>
            <div className="card-body">
              <p className="birth-date">
                <strong>Born:</strong> {formatDate(coupleData.hisDateOfBirth)}
              </p>
              {coupleData.hisBio && (
                <p className="bio">{coupleData.hisBio}</p>
              )}
              {coupleData.hisFavoriteQuote && (
                <p className="quote">"{coupleData.hisFavoriteQuote}"</p>
              )}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'love-letter' && (
            <div className="love-letters-section">
              <h2>Love Letters</h2>
              {loveLetters.length === 0 ? (
                <p className="empty-message">No love letters yet. Start writing one!</p>
              ) : (
                <div className="letters-grid">
                  {loveLetters.map((letter) => (
                    <div 
                      key={letter.id} 
                      className="letter-card"
                      onClick={() => openLetterModal(letter)}
                    >
                      <h3>{letter.title}</h3>
                      <p className="letter-meta">
                        From {letter.author} • {formatDate(letter.letterDate)}
                      </p>
                      <p className="letter-preview">
                        {letter.content.substring(0, 100)}
                        {letter.content.length > 100 ? '...' : ''}
                      </p>
                      <span className="read-more">Click to read more →</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'memories' && (
            <div className="memories-section">
              <h2>Our Memories</h2>
              {memories.length === 0 ? (
                <p className="empty-message">No memories captured yet.</p>
              ) : (
                <div className="memories-grid">
                  {memories.map((memory) => (
                    <div key={memory.id} className="memory-card">
                      {memory.imageUrl && (
                        <div className="memory-image">
                          <img src={memory.imageUrl} alt={memory.title} />
                        </div>
                      )}
                      <div className="memory-info">
                        <h3>{memory.title}</h3>
                        <p className="memory-date">{formatDate(memory.memoryDate)}</p>
                        {memory.location && (
                          <p className="memory-location">📍 {memory.location}</p>
                        )}
                        {memory.description && (
                          <p className="memory-description">{memory.description}</p>
                        )}
                        {memory.tags && (
                          <div className="memory-tags">
                            {memory.tags.split(',').map((tag, index) => (
                              <span key={index} className="tag">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'important-dates' && (
            <div className="dates-section">
              <h2>Important Dates</h2>
              {importantDates.length === 0 ? (
                <p className="empty-message">No important dates saved.</p>
              ) : (
                <div className="dates-list">
                  {importantDates.map((date) => (
                    <div key={date.id} className="date-card">
                      <div className="date-icon">📅</div>
                      <div className="date-info">
                        <h3>{date.title}</h3>
                        <p className="date-value">{formatDate(date.eventDate)}</p>
                        {date.description && (
                          <p className="date-description">{date.description}</p>
                        )}
                        <div className="date-badges">
                          <span className="category-badge">{date.category}</span>
                          {date.isRecurring && (
                            <span className="recurring-badge">Recurring</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Love Letter Modal */}
      {isModalOpen && selectedLetter && (
        <div className="modal-overlay" onClick={closeLetterModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeLetterModal}>
              ×
            </button>
            <div className="modal-header">
              <h2>{selectedLetter.title}</h2>
              <p className="modal-meta">
                From {selectedLetter.author} • {formatDate(selectedLetter.letterDate)}
              </p>
            </div>
            <div className="modal-body">
              <p className="letter-full-content">{selectedLetter.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

