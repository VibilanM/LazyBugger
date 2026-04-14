import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, signupUser as apiSignup } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('lb_token');
    const savedUser = localStorage.getItem('lb_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    const { access_token, user: userData } = data;
    localStorage.setItem('lb_token', access_token);
    localStorage.setItem('lb_user', JSON.stringify(userData));
    setToken(access_token);
    setUser(userData);
    return data;
  };

  const signup = async (email, password) => {
    const data = await apiSignup(email, password);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('lb_token');
    localStorage.removeItem('lb_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
