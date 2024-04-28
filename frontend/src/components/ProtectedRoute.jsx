import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAdmin, isUser }) {
  const isAuthenticated = !!document.cookie.split('; ').find((row) => row.startsWith('user_id='));
  const userRole = document.cookie.split('; ').find((row) => row.startsWith('user_role='))?.split('=')[1];

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && userRole !== 'admin') {
    return <Navigate to="/" replace />; // Redirect to home or another page
  } else if (isUser && userRole !== 'user') {
    return <Navigate to="/" replace />; // Redirect to home or another page
  }

  return children;
}

export default ProtectedRoute;