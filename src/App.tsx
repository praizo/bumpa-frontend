import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/Login';
import LoyaltyRewards from './pages/LoyaltyRewards';
import DashboardLayout from './layouts/DashboardLayout';
import { Toaster } from '@/components/ui/sonner';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/loyalty" element={<LoyaltyRewards />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
