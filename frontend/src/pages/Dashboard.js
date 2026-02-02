import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getCoupleById, 
  getLoveLetters, 
  getMemories, 
  getImportantDates,
  createLoveLetter,
  createMemory,
  createImportantDate,
  deleteLoveLetter,
  deleteMemory,
  deleteImportantDate,
  uploadCouplePhoto,
  updateCouplePhoto,
  uploadMemoryPhoto
} from '../services/api';
import ImageCropModal from '../components/ImageCropModal';
import FloatingEmojis from '../components/FloatingEmojis';
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
  
  // Add forms state
  const [showAddLetterForm, setShowAddLetterForm] = useState(false);
  const [showAddMemoryForm, setShowAddMemoryForm] = useState(false);
  const [showAddDateForm, setShowAddDateForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [memoryPhotoFile, setMemoryPhotoFile] = useState(null);
  
  // Crop modal state
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [cropType, setCropType] = useState(null); // 'couple' or 'memory'

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

  // Handle adding new declaration of love
  const handleAddLetter = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const coupleId = sessionStorage.getItem('coupleId');
    
    try {
      const letterData = {
        coupleId: parseInt(coupleId),
        title: formData.get('title'),
        content: formData.get('content'),
        author: formData.get('author'),
        letterDate: formData.get('letterDate'),
      };
      
      await createLoveLetter(letterData);
      const updatedLetters = await getLoveLetters(coupleId);
      setLoveLetters(updatedLetters);
      setShowAddLetterForm(false);
      e.target.reset();
    } catch (error) {
      console.error('Error adding declaration:', error);
      alert('Failed to add declaration');
    }
  };

  // Handle memory photo selection - trigger crop modal
  const handleMemoryPhotoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    // Validate file size (10MB before crop)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return;
    }
    
    // Create preview URL and open crop modal
    const imageUrl = URL.createObjectURL(file);
    setImageToCrop(imageUrl);
    setCropType('memory');
    setShowCropModal(true);
  };

  // Handle cropped memory photo
  const handleCroppedMemoryPhoto = async (croppedBlob) => {
    try {
      // Convert blob to file and store it
      const file = new File([croppedBlob], 'memory-photo.jpg', { type: 'image/jpeg' });
      setMemoryPhotoFile(file);
      
      // Clean up
      setShowCropModal(false);
      URL.revokeObjectURL(imageToCrop);
      setImageToCrop(null);
      
      alert('Photo cropped successfully! Now fill in the memory details.');
    } catch (error) {
      console.error('Error processing cropped photo:', error);
      alert('Failed to process photo');
    }
  };

  // Handle adding new memory
  const handleAddMemory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const coupleId = sessionStorage.getItem('coupleId');
    
    try {
      let imageUrl = '';
      
      // If user uploaded a file, upload it first
      if (memoryPhotoFile) {
        setUploading(true);
        const uploadResponse = await uploadMemoryPhoto(memoryPhotoFile);
        imageUrl = `http://localhost:8080${uploadResponse.url}`;
      } else {
        // Otherwise use the URL they entered
        imageUrl = formData.get('imageUrl');
      }
      
      const memoryData = {
        coupleId: parseInt(coupleId),
        title: formData.get('title'),
        description: formData.get('description'),
        memoryDate: formData.get('memoryDate'),
        imageUrl: imageUrl,
        location: formData.get('location'),
        tags: formData.get('tags'),
      };
      
      await createMemory(memoryData);
      const updatedMemories = await getMemories(coupleId);
      setMemories(updatedMemories);
      setShowAddMemoryForm(false);
      setMemoryPhotoFile(null);
      e.target.reset();
    } catch (error) {
      console.error('Error adding memory:', error);
      alert('Failed to add memory');
    } finally {
      setUploading(false);
    }
  };

  // Handle couple photo upload - trigger crop modal
  const handleCouplePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    // Validate file size (10MB before crop)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return;
    }
    
    // Create preview URL and open crop modal
    const imageUrl = URL.createObjectURL(file);
    setImageToCrop(imageUrl);
    setCropType('couple');
    setShowCropModal(true);
  };

  // Handle cropped couple photo upload
  const handleCroppedCouplePhoto = async (croppedBlob) => {
    try {
      setUploading(true);
      setShowCropModal(false);
      const coupleId = sessionStorage.getItem('coupleId');
      
      // Convert blob to file
      const file = new File([croppedBlob], 'couple-photo.jpg', { type: 'image/jpeg' });
      
      // Upload file
      const uploadResponse = await uploadCouplePhoto(file);
      const photoUrl = `http://localhost:8080${uploadResponse.url}`;
      
      // Update couple photo URL in database
      await updateCouplePhoto(coupleId, photoUrl);
      
      // Refresh couple data
      const updatedCouple = await getCoupleById(coupleId);
      setCoupleData(updatedCouple);
      
      // Clean up
      URL.revokeObjectURL(imageToCrop);
      setImageToCrop(null);
      
      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  // Handle crop modal cancel
  const handleCropCancel = () => {
    setShowCropModal(false);
    if (imageToCrop) {
      URL.revokeObjectURL(imageToCrop);
    }
    setImageToCrop(null);
    setCropType(null);
  };

  // Handle adding new important date
  const handleAddDate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const coupleId = sessionStorage.getItem('coupleId');
    
    try {
      const dateData = {
        coupleId: parseInt(coupleId),
        title: formData.get('title'),
        description: formData.get('description'),
        eventDate: formData.get('eventDate'),
        category: formData.get('category'),
        isRecurring: formData.get('isRecurring') === 'on',
      };
      
      await createImportantDate(dateData);
      const updatedDates = await getImportantDates(coupleId);
      setImportantDates(updatedDates);
      setShowAddDateForm(false);
      e.target.reset();
    } catch (error) {
      console.error('Error adding important date:', error);
      alert('Failed to add important date');
    }
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
      <FloatingEmojis />
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <h1 className="dashboard-title">💕 Love Dashboard</h1>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'love-letter' ? 'active' : ''}`}
            onClick={() => setActiveTab('love-letter')}
          >
            Declaration of Love
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
            <div className="photo-wrapper">
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
              <label className="photo-upload-btn" title="Upload couple photo">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleCouplePhotoUpload}
                  style={{ display: 'none' }}
                  disabled={uploading}
                />
                {uploading ? '⏳' : '📷'}
              </label>
            </div>
            <p className="anniversary-text">
              Together since {formatDate(coupleData.anniversaryDate)}
            </p>
            <p className="upload-hint">Click 📷 to upload photo (JPG/PNG, max 5MB)</p>
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
              <div className="section-header">
                <h2>Declarations of Love</h2>
                <button 
                  className="add-button"
                  onClick={() => setShowAddLetterForm(!showAddLetterForm)}
                >
                  {showAddLetterForm ? '✕ Cancel' : '+ Add Declaration'}
                </button>
              </div>

              {showAddLetterForm && (
                <form className="add-form" onSubmit={handleAddLetter}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Letter Title"
                    required
                  />
                  <textarea
                    name="content"
                    placeholder="Write your declaration of love here..."
                    rows="6"
                    required
                  ></textarea>
                  <input
                    type="text"
                    name="author"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    type="date"
                    name="letterDate"
                    required
                  />
                  <button type="submit" className="submit-button">Save Declaration</button>
                </form>
              )}

              {loveLetters.length === 0 ? (
                <p className="empty-message">No declarations yet. Start writing one!</p>
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
              <div className="section-header">
                <h2>Our Memories</h2>
                <button 
                  className="add-button"
                  onClick={() => setShowAddMemoryForm(!showAddMemoryForm)}
                >
                  {showAddMemoryForm ? '✕ Cancel' : '+ Add Memory'}
                </button>
              </div>

              {showAddMemoryForm && (
                <form className="add-form" onSubmit={handleAddMemory}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Memory Title"
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Describe this special moment..."
                    rows="4"
                  ></textarea>
                  <input
                    type="date"
                    name="memoryDate"
                    required
                  />
                  
                  <div className="file-input-group">
                    <label className="file-label">
                      📷 Upload Photo (JPG/PNG, max 10MB)
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleMemoryPhotoSelect}
                        className="file-input"
                      />
                    </label>
                    {memoryPhotoFile && (
                      <span className="file-name">✓ {memoryPhotoFile.name}</span>
                    )}
                  </div>
                  
                  <div className="or-divider">
                    <span>OR</span>
                  </div>
                  
                  <input
                    type="url"
                    name="imageUrl"
                    placeholder="Or paste image URL"
                    disabled={memoryPhotoFile !== null}
                  />
                  
                  <input
                    type="text"
                    name="location"
                    placeholder="Location (optional)"
                  />
                  <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma-separated, e.g., vacation, beach, 2024)"
                  />
                  <button type="submit" className="submit-button" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Save Memory'}
                  </button>
                </form>
              )}

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
              <div className="section-header">
                <h2>Important Dates</h2>
                <button 
                  className="add-button"
                  onClick={() => setShowAddDateForm(!showAddDateForm)}
                >
                  {showAddDateForm ? '✕ Cancel' : '+ Add Date'}
                </button>
              </div>

              {showAddDateForm && (
                <form className="add-form" onSubmit={handleAddDate}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Event Description (optional)"
                    rows="3"
                  ></textarea>
                  <input
                    type="date"
                    name="eventDate"
                    required
                  />
                  <select name="category" required>
                    <option value="">Select Category</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="special">Special Event</option>
                    <option value="holiday">Holiday</option>
                  </select>
                  <label className="checkbox-label">
                    <input type="checkbox" name="isRecurring" />
                    <span>Recurring event (happens yearly)</span>
                  </label>
                  <button type="submit" className="submit-button">Save Date</button>
                </form>
              )}

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

      {/* Declaration of Love Modal */}
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

      {/* Image Crop Modal */}
      {showCropModal && imageToCrop && (
        <ImageCropModal
          imageSrc={imageToCrop}
          onCropComplete={cropType === 'couple' ? handleCroppedCouplePhoto : handleCroppedMemoryPhoto}
          onCancel={handleCropCancel}
          aspectRatio={1}
        />
      )}
    </div>
  );
};

export default Dashboard;

