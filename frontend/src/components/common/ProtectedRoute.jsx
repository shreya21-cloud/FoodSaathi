import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles } from 'lucide-react';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialLoading } = useAuth();
  const location = useLocation();

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-[#fcfdf9] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white shadow-xl shadow-emerald-900/10 animate-pulse">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="text-center">
            <h3 className="text-base font-bold text-slate-800">FoodRescue AI</h3>
            <p className="text-xs text-slate-500 mt-1">Verifying secure session...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
