import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getChallengeById, getParticipants, joinChallenge, leaveChallenge } from '../services/api';
import './ChallengeDetail.css';

export default function ChallengeDetail() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  const isParticipant = participants.some((p) => p.user_id === user?.id);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [challengeData, participantsData] = await Promise.all([
        getChallengeById(id),
        getParticipants(id),
      ]);
      // getChallengeById returns an array
      setChallenge(Array.isArray(challengeData) ? challengeData[0] : challengeData);
      setParticipants(participantsData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleJoin = async () => {
    setActionLoading(true);
    try {
      await joinChallenge(id);
      await fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeave = async () => {
    setActionLoading(true);
    try {
      await leaveChallenge(id);
      await fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No deadline set';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpired = (dateStr) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-loading">
          <span className="detail-loading-icon">⏳</span>
          <p>Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="detail-page">
        <Link to="/" className="detail-back">← Back to Challenges</Link>
        <div className="detail-loading">
          <span className="detail-loading-icon">😵</span>
          <p>{error || 'Challenge not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page" id="challenge-detail-page">
      <Link to="/" className="detail-back">← Back to Challenges</Link>

      <div className="detail-card">
        <div className="detail-card-top">
          <span className={`detail-badge ${challenge.is_public ? 'public' : 'private'}`}>
            {challenge.is_public ? '🌍 Public' : '🔒 Private'}
          </span>

          <h1 className="detail-title" id="challenge-title">{challenge.title}</h1>

          <div className="detail-meta">
            <div className="detail-meta-item">
              <span className="detail-meta-icon">⏰</span>
              <span style={isExpired(challenge.deadline) ? { color: 'var(--accent-red)' } : {}}>
                {formatDate(challenge.deadline)}
                {isExpired(challenge.deadline) && ' (Expired)'}
              </span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-icon">👥</span>
              <span>{participants.length} participant{participants.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="detail-card-body">
          <div className="detail-section">
            <h2 className="detail-section-title">Description</h2>
            {challenge.description ? (
              <p className="detail-description">{challenge.description}</p>
            ) : (
              <p className="detail-no-description">No description provided.</p>
            )}
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">Participants</h2>
            <p className="detail-participants-count">{participants.length}</p>
            <p className="detail-participants-label">
              {participants.length === 0
                ? 'No one has joined yet. Be the first!'
                : `people are taking on this challenge`}
            </p>
          </div>

          <div className="detail-actions">
            {!isAuthenticated ? (
              <Link to="/login" className="btn-login-prompt" id="login-to-join">
                🔑 Login to Join
              </Link>
            ) : isParticipant ? (
              <button
                className="btn-leave"
                onClick={handleLeave}
                disabled={actionLoading}
                id="leave-challenge-btn"
              >
                {actionLoading ? 'Leaving...' : '🚪 Leave Challenge'}
              </button>
            ) : (
              <button
                className="btn-join"
                onClick={handleJoin}
                disabled={actionLoading}
                id="join-challenge-btn"
              >
                {actionLoading ? 'Joining...' : '🤝 Join Challenge'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
