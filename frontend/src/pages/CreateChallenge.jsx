import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createChallenge } from '../services/api';
import './CreateChallenge.css';
import './Auth.css'; /* reuse form-group, form-label, form-input, auth-error */

export default function CreateChallenge() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);

    try {
      await createChallenge({
        title: title.trim(),
        description: description.trim(),
        is_public: isPublic,
        deadline: deadline || null,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page" id="create-challenge-page">
      <Link to="/" className="create-back">
        ← Back to Challenges
      </Link>

      <div className="create-card">
        <div className="create-header">
          <h1>🎯 New Challenge</h1>
          <p>Define your challenge and rally the troops</p>
        </div>

        <form className="create-form" onSubmit={handleSubmit} id="create-challenge-form">
          {error && (
            <div className="auth-error" id="create-error">
              ⚠️ {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="challenge-title">Title</label>
            <input
              className="form-input"
              id="challenge-title"
              type="text"
              placeholder="e.g., 30-Day No Social Media"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="challenge-description">Description</label>
            <textarea
              className="form-textarea"
              id="challenge-description"
              placeholder="What's this challenge about? What are the rules?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
            />
          </div>

          <div className="form-toggle-group">
            <div className="form-toggle-label">
              <span>🌍 Public Challenge</span>
              <span>Anyone can see and join this challenge</span>
            </div>
            <label className="form-toggle">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                id="challenge-public"
              />
              <span className="form-toggle-slider"></span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="challenge-deadline">Deadline</label>
            <input
              className="form-input"
              id="challenge-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <button
            className="create-submit-btn"
            type="submit"
            disabled={loading}
            id="create-submit"
          >
            {loading ? 'Creating...' : '🚀 Launch Challenge'}
          </button>
        </form>
      </div>
    </div>
  );
}
