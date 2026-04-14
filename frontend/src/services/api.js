const API_BASE = 'http://localhost:3000';

function getToken() {
  return localStorage.getItem('lb_token');
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.error?.message || data?.error || data?.message || 'Something went wrong';
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  return data;
}

// Auth
export async function signupUser(email, password) {
  return request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function loginUser(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// Challenges
export async function getAllChallenges() {
  return request('/challenges');
}

export async function getChallengeById(id) {
  return request(`/challenges/${id}`);
}

export async function createChallenge({ title, description, is_public, deadline }) {
  return request('/challenges', {
    method: 'POST',
    body: JSON.stringify({ title, description, is_public, deadline }),
  });
}

export async function getMyChallenges() {
  return request('/challenges/my-challenges');
}

// Participation
export async function joinChallenge(id) {
  return request(`/challenges/${id}/join`, {
    method: 'POST',
  });
}

export async function leaveChallenge(id) {
  return request(`/challenges/${id}/leave`, {
    method: 'DELETE',
  });
}

export async function getParticipants(id) {
  return request(`/challenges/${id}/participants`);
}
