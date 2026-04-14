import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllChallenges } from '../services/api';
import ChallengeCard from '../components/ChallengeCard';
import './Home.css';

export default function Home() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  const fetchChallenges = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllChallenges();
      setChallenges(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="home-page" id="home-page">
      <div className="home-header">
        <div className="home-header-text">
          <h1>
            Active <span>Challenges</span>
          </h1>
          <p>Push your limits. Stay accountable. Crush your goals.</p>
        </div>

        {isAuthenticated && (
          <Link to="/challenges/new" className="home-create-btn" id="create-challenge-btn">
            ✨ New Challenge
          </Link>
        )}
      </div>

      {loading && (
        <div className="home-loading">
          <span className="home-loading-icon">⏳</span>
          <p>Loading challenges...</p>
        </div>
      )}

      {error && (
        <div className="home-error">
          <span className="home-error-icon">😵</span>
          <p>{error}</p>
          <button onClick={fetchChallenges} className="home-error-retry" id="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && challenges.length === 0 && (
        <div className="home-empty">
          <span className="home-empty-icon">🦗</span>
          <p>No challenges yet. Be the first to create one!</p>
        </div>
      )}

      {!loading && !error && challenges.length > 0 && (
        <div className="challenges-grid stagger-children" id="challenges-grid">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}

      {isAuthenticated && (
        <Link to="/challenges/new" className="home-fab" id="create-challenge-fab">
          +
        </Link>
      )}
    </div>
  );
}
