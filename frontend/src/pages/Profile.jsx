import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyChallenges } from '../services/api';
import './Profile.css';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyChallenges = async () => {
      try {
        const data = await getMyChallenges();
        setChallenges(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyChallenges();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No deadline';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="profile-page" id="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-info">
          <h1>{user?.email || 'User'}</h1>
          <p>Your accountability dashboard</p>
        </div>
      </div>

      <h2 className="profile-section-title">
        🎯 My Challenges
      </h2>

      {loading && (
        <div className="profile-loading">
          <span className="profile-loading-icon">⏳</span>
          <p>Loading your challenges...</p>
        </div>
      )}

      {error && (
        <div className="profile-loading">
          <span className="profile-loading-icon">😵</span>
          <p style={{ color: 'var(--accent-red)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && challenges.length === 0 && (
        <div className="profile-empty">
          <span className="profile-empty-icon">🦗</span>
          <p>You haven't joined any challenges yet.</p>
          <Link to="/" className="profile-empty-link">Browse Challenges →</Link>
        </div>
      )}

      {!loading && !error && challenges.length > 0 && (
        <div className="profile-challenges-grid stagger-children" id="my-challenges-list">
          {challenges.map((item, index) => (
            <div
              key={index}
              className="profile-challenge-item"
              onClick={() => item.challenges?.id && navigate(`/challenges/${item.challenges.id}`)}
            >
              <div className="profile-challenge-info">
                <span className="profile-challenge-title">
                  {item.challenges?.title || 'Untitled Challenge'}
                </span>
                <span className="profile-challenge-deadline">
                  ⏰ {formatDate(item.challenges?.deadline)}
                </span>
              </div>
              <span className={`profile-challenge-status ${item.status}`}>
                {item.status === 'active' ? '🟢' : item.status === 'completed' ? '🏆' : '🔴'}{' '}
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
