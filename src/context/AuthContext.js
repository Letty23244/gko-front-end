// src/contexts/AuthContext.js
import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../Api/Api';


export const AuthContext = createContext(null);

const tokenStorage = {
  get: () => {
    try {
      return localStorage.getItem('jwt_token') || null;
    } catch (error) {
      console.error('LocalStorage access error:', error);
      return null;
    }
  },
  set: (token) => {
    try {
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('jwt_token_last_updated', Date.now().toString());
    } catch (error) {
      console.error('LocalStorage set error:', error);
    }
  },
  clear: () => {
    try {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('jwt_token_last_updated');
    } catch (error) {
      console.error('LocalStorage clear error:', error);
    }
  },
};

const validateToken = (token) => {
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp && decoded.exp < currentTime) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
};




export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: null,
    loading: true,
    initialized: false,
    error: null,
    networkError: false,
  });

  const derivedState = useMemo(() => ({
    isAdmin: ['admin', 'super_admin'].includes(state.user?.role),
    isSuperAdmin: state.user?.role === 'super_admin',
    isCustomer: state.user?.role === 'customer',
    isAuthenticated: !!state.user && !!state.token,
  }), [state.user, state.token]);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setState({
      user: null,
      token: null,
      loading: false,
      initialized: true,
      error: null,
      networkError: false,
    });
  }, []);

  const login = useCallback(async (token, userData) => {
    const decoded = validateToken(token);
    if (!decoded) {
      setState(prev => ({ ...prev, error: 'Invalid token' }));
      return false;
    }

    tokenStorage.set(token);
    setState({
      user: userData || {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role || 'customer',
        name: decoded.name || decoded.email.split('@')[0],
      },
      token,
      loading: false,
      initialized: true,
      error: null,
      networkError: false,
    });
    return true;
  }, []);

  const updateUser = useCallback((userData) => {
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        ...userData
      },
      networkError: false,
    }));
  }, []);

  const initializeAuth = useCallback(async () => {
    const storedToken = tokenStorage.get();
    if (!storedToken) {
      setState(prev => ({ ...prev, loading: false, initialized: true }));
      return;
    }

    const decoded = validateToken(storedToken);
    if (!decoded) {
      tokenStorage.clear();
      setState({
        user: null,
        token: null,
        loading: false,
        initialized: true,
        error: 'Session expired',
        networkError: false,
      });
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true }));
      
      setState(prev => ({
        ...prev,
        user: {
          id: decoded.sub,
          email: decoded.email,
          role: decoded.role || 'customer',
          name: decoded.name || decoded.email.split('@')[0],
        },
        token: storedToken,
      }));

      const userResponse = await ApiService.auth.getCurrentUser();
      await login(storedToken, userResponse.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      
      if (error.message === 'Network Error' || error.message.includes('Failed to fetch')) {
        setState(prev => ({
          ...prev,
          loading: false,
          initialized: true,
          networkError: true,
          error: 'Connection problem. Please check your network or try again later.'
        }));
      } else if (error.response?.status === 401) {
        await logout();
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          initialized: true,
          error: error.response?.data?.message || error.message || 'Failed to load user data'
        }));
      }
    }
  }, [login, logout]);

  const retryAuth = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, networkError: false }));
    await initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const value = useMemo(() => ({
    ...state,
    ...derivedState,
    login,
    logout,
    updateUser,
    retryAuth,
  }), [state, derivedState, login, logout, updateUser, retryAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};