import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useStore from '../store/store';
import apiClient from '../api/axios';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const clearAuth = useStore((state) => state.clearAuth);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await apiClient.get('/user/verify');
        if (response.data.success) {
          setIsAuthenticated(true);
          if (!user.email) {
            setUser(response.data.user);
          }
        } else {
          clearAuth();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        clearAuth();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;