import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faCompass, faBookmark, faBell, 
  faUser, faPlus, faSearch, faCog, 
  faStar, faComment, faHeart, faShare
} from '@fortawesome/free-solid-svg-icons';

// Component for generating random color
const getRandomColor = (seed) => {
  // Use seed to generate consistent colors for the same user
  const hash = String(seed).split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const h = Math.abs(hash % 360);
  return `hsl(${h}, 70%, 60%)`;
};

// Component for user avatar
const UserAvatar = ({ name, size = 'medium' }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const backgroundColor = getRandomColor(name);
  
  const sizeClass = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large'
  }[size] || 'avatar-medium';
  
  return (
    <div className={`user-avatar ${sizeClass}`} style={{ backgroundColor }}>
      {initial}
    </div>
  );
};

// Component for a single review card
const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-author-img">
          <UserAvatar name={review.author} />
        </div>
        <div className="review-author-info">
          <div className="review-author-name">{review.author}</div>
          <div className="review-date">{review.date}</div>
        </div>
        <div className="review-rating">
          {Array(Math.floor(review.rating)).fill().map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} />
          ))}
          {review.rating % 1 !== 0 && <FontAwesomeIcon icon={faStar} className="half-star" />}
        </div>
      </div>
      
      <div className="review-content">
        {review.content}
      </div>
      
      {review.images.length > 0 && (
        <div className="review-images">
          {review.images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Review image ${index + 1}`} 
              className="review-image" 
            />
          ))}
        </div>
      )}
      
      <div className="review-actions">
        <div className="review-action">
          <FontAwesomeIcon icon={faHeart} />
          <span>{review.likes}</span>
        </div>
        
        <div className="review-action">
          <FontAwesomeIcon icon={faComment} />
          <span>{review.comments}</span>
        </div>
        
        <div className="review-action">
          <FontAwesomeIcon icon={faShare} />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

// Component for Sidebar
const Sidebar = ({ activeTab, setActiveTab, notifications, setShowAddReviewModal, userName, userHandle }) => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">P</div>
        <h1>PeerPicks</h1>
      </div>

      <div className="menu-items">
        <a 
          className={`menu-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </a>
        
        <a 
          className={`menu-item ${activeTab === 'explore' ? 'active' : ''}`}
          onClick={() => setActiveTab('explore')}
        >
          <FontAwesomeIcon icon={faCompass} />
          <span>Explore</span>
        </a>
        
        <a 
          className={`menu-item ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <FontAwesomeIcon icon={faBookmark} />
          <span>Saved</span>
        </a>
        
        <a 
          className={`menu-item ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
          {notifications > 0 && 
            <div className="notification-indicator">{notifications}</div>
          }
        </a>
        
        <a 
          className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </a>
      </div>

      <button 
        className="add-review-btn"
        onClick={() => setShowAddReviewModal(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>Add Review</span>
      </button>

      <div className="profile-section">
        <div className="profile-img">
          <UserAvatar name={userName} />
        </div>
        <div className="profile-info">
          <div className="profile-name">{userName}</div>
          <div className="profile-handle">{userHandle}</div>
        </div>
      </div>
    </div>
  );
};

// Component for Header
const Header = ({ notifications }) => {
  return (
    <div className="header">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search PeerPicks" />
      </div>
      
      <div className="header-actions">
        <div className="header-icon">
          <FontAwesomeIcon icon={faBell} />
          {notifications > 0 && 
            <div className="notification-indicator small">{notifications}</div>
          }
        </div>
        
        <div className="header-icon">
          <FontAwesomeIcon icon={faCog} />
        </div>
      </div>
    </div>
  );
};

// Component for Home Feed
const HomeFeed = ({ reviews }) => {
  return (
    <div className="feed">
      <div className="feed-header">
        <h2>Your Feed</h2>
      </div>
      
      <div className="feed-filter">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Following</button>
        <button className="filter-btn">Popular</button>
      </div>
      
      {/* Reviews */}
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

// Component for Profile Page
const ProfileContent = ({ setShowAddReviewModal, userName, userHandle }) => {
  return (
    <div className="profile-content">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-details">
          <div className="profile-avatar">
            <UserAvatar name={userName} size="large" />
          </div>
          <div className="profile-text">
            <h2>{userName}</h2>
            <p className="profile-handle">{userHandle}</p>
            <p className="profile-bio">Food enthusiast. Always on the hunt for the next great restaurant.</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat">
            <div className="stat-value">42</div>
            <div className="stat-label">Reviews</div>
          </div>
          <div className="stat">
            <div className="stat-value">128</div>
            <div className="stat-label">Following</div>
          </div>
          <div className="stat">
            <div className="stat-value">96</div>
            <div className="stat-label">Followers</div>
          </div>
        </div>
      </div>
      
      <div className="profile-content-tabs">
        <button className="profile-tab active">Reviews</button>
        <button className="profile-tab">Likes</button>
        <button className="profile-tab">Media</button>
      </div>
      
      <div className="profile-reviews">
        <div className="empty-state">
          <p>You haven't posted any reviews yet.</p>
          <button 
            className="add-review-btn small"
            onClick={() => setShowAddReviewModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Your First Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for Notifications
const NotificationsContent = () => {
  return (
    <div className="notifications-content">
      <div className="feed-header">
        <h2>Notifications</h2>
      </div>
      
      <div className="notification-item">
        <div className="notification-avatar">
          <UserAvatar name="Alex Morgan" size="small" />
        </div>
        <div className="notification-content">
          <p><strong>Alex Morgan</strong> liked your review of Coffee House</p>
          <p className="notification-time">2 hours ago</p>
        </div>
      </div>
      
      <div className="notification-item">
        <div className="notification-avatar">
          <UserAvatar name="Jane Cooper" size="small" />
        </div>
        <div className="notification-content">
          <p><strong>Jane Cooper</strong> commented on your review: "Great recommendation!"</p>
          <p className="notification-time">1 day ago</p>
        </div>
      </div>
      
      <div className="notification-item">
        <div className="notification-avatar">
          <UserAvatar name="Sam Wilson" size="small" />
        </div>
        <div className="notification-content">
          <p><strong>Sam Wilson</strong> started following you</p>
          <p className="notification-time">3 days ago</p>
        </div>
      </div>
    </div>
  );
};

// Component for Add Review Modal
const AddReviewModal = ({ 
  setShowAddReviewModal, 
  reviewText, 
  setReviewText, 
  reviewImages, 
  setReviewImages, 
  handleAddReview, 
  handleFileChange,
  userName 
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add a Review</h2>
          <button 
            className="close-modal"
            onClick={() => setShowAddReviewModal(false)}
          >
            &times;
          </button>
        </div>
        
        <div className="modal-body">
          <div className="modal-user-info">
            <UserAvatar name={userName} size="small" />
            <span className="modal-username">{userName}</span>
          </div>
          
          <textarea
            className="review-textarea"
            placeholder="Share your thoughts..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          
          {reviewImages.length > 0 && (
            <div className="review-images-preview">
              {reviewImages.map((img, index) => (
                <div className="image-preview-container" key={index}>
                  <img 
                    src={img} 
                    alt={`Preview ${index + 1}`} 
                    className="image-preview" 
                  />
                  <button 
                    className="remove-image"
                    onClick={() => {
                      setReviewImages(reviewImages.filter((_, i) => i !== index));
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="review-actions-row">
            <div className="review-add-media">
              <label className="media-upload-label">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add Photos</span>
                <input 
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="file-input"
                />
              </label>
            </div>
            
            <div className="review-rating-select">
              <span>Rating:</span>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon 
                    key={star}
                    icon={faStar} 
                    className="rating-star active"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="cancel-btn"
            onClick={() => setShowAddReviewModal(false)}
          >
            Cancel
          </button>
          
          <button 
            className="post-review-btn"
            onClick={handleAddReview}
            disabled={!reviewText.trim()}
          >
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [reviewText, setReviewText] = useState('');
  const [reviewImages, setReviewImages] = useState([]);
  const [userName, setUserName] = useState('Your Name');
  const [userHandle, setUserHandle] = useState('@yourhandle');

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserHandle = localStorage.getItem('userHandle');
    
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    if (storedUserHandle) {
      setUserHandle(storedUserHandle);
    } else if (storedUserName) {
      // If we have a name but no handle, create a default handle
      const defaultHandle = '@' + storedUserName.toLowerCase().replace(/\s+/g, '');
      setUserHandle(defaultHandle);
      localStorage.setItem('userHandle', defaultHandle);
    }
  }, []);

  // Sample reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Jane Cooper',
      handle: '@janecooper',
      date: '2 hours ago',
      rating: 4.5,
      content: 'The new coffee shop on Main Street is a hidden gem! Great ambiance and even better coffee. Their pastries are to die for, especially the almond croissant.',
      images: ['/reviews/coffee1.jpg', '/reviews/coffee2.jpg'],
      likes: 24,
      comments: 6
    },
    {
      id: 2,
      author: 'Alex Morgan',
      handle: '@alexm',
      date: '1 day ago',
      rating: 3.5,
      content: 'Tried the new Thai restaurant downtown. Food was authentic and flavorful, but service was a bit slow. The Pad Thai is definitely worth trying though!',
      images: ['/reviews/thai1.jpg'],
      likes: 18,
      comments: 4
    }
  ]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => 
        URL.createObjectURL(file)
      );
      setReviewImages(prevImages => prevImages.concat(filesArray));
    }
  };

  const handleAddReview = () => {
    if (reviewText.trim() === '') return;
    
    const newReview = {
      id: reviews.length + 1,
      author: userName,
      handle: userHandle,
      date: 'Just now',
      rating: 5,
      content: reviewText,
      images: reviewImages,
      likes: 0,
      comments: 0
    };

    setReviews([newReview, ...reviews]);
    setReviewText('');
    setReviewImages([]);
    setShowAddReviewModal(false);

    // Simulate notification for other users
    setTimeout(() => {
      sendNotification('You added a new review!');
    }, 1000);
  };

  const sendNotification = (message) => {
    // This would connect to your notification system
    console.log('Notification sent:', message);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Component */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        notifications={notifications}
        setShowAddReviewModal={setShowAddReviewModal}
        userName={userName}
        userHandle={userHandle}
      />

      {/* Main Content */}
      <div className="main-content">
        {/* Header Component */}
        <Header notifications={notifications} />

        {/* Conditional rendering based on active tab */}
        {activeTab === 'home' && <HomeFeed reviews={reviews} />}
        {activeTab === 'profile' && (
          <ProfileContent 
            setShowAddReviewModal={setShowAddReviewModal} 
            userName={userName}
            userHandle={userHandle}
          />
        )}
        {activeTab === 'notifications' && <NotificationsContent />}
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <AddReviewModal 
          setShowAddReviewModal={setShowAddReviewModal}
          reviewText={reviewText}
          setReviewText={setReviewText}
          reviewImages={reviewImages}
          setReviewImages={setReviewImages}
          handleAddReview={handleAddReview}
          handleFileChange={handleFileChange}
          userName={userName}
        />
      )}
    </div>
  );
};

export default Dashboard;