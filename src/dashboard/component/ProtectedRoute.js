import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    // Not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Logged in but wrong role → redirect to main site
    return <Navigate to="/" replace />;
  }

  // Logged in with correct role → render children
  return children;
};

export default ProtectedRoute;
