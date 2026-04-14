import { useNavigate } from 'react-router-dom';
import './ChallengeCard.css';

export default function ChallengeCard({ challenge }) {
  const navigate = useNavigate();

  const formatDeadline = (dateStr) => {
    if (!dateStr) return 'No deadline';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isExpired = (dateStr) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  };

  return (
    <article
      className="challenge-card"
      onClick={() => navigate(`/challenges/${challenge.id}`)}
      id={`challenge-card-${challenge.id}`}
    >
      <div className="challenge-card-header">
        <h3 className="challenge-card-title">{challenge.title}</h3>
        <span className={`challenge-card-badge ${challenge.is_public ? 'public' : 'private'}`}>
          {challenge.is_public ? '🌍 Public' : '🔒 Private'}
        </span>
      </div>

      <p className="challenge-card-description">
        {challenge.description || 'No description provided.'}
      </p>

      <div className="challenge-card-footer">
        <span
          className="challenge-card-deadline"
          style={isExpired(challenge.deadline) ? { color: 'var(--accent-red)' } : {}}
        >
          ⏰ {formatDeadline(challenge.deadline)}
          {isExpired(challenge.deadline) && ' (Expired)'}
        </span>
        <span className="challenge-card-arrow">→</span>
      </div>
    </article>
  );
}
