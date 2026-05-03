import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import Login from './pages/Login';
import OrderPage from './pages/OrderPage';
import AdminDashboard from './pages/AdminDashboard';
import MenuManagement from './pages/MenuManagement';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              <PageTransition>
                <Login />
              </PageTransition>
            } />
            
            {/* Member Routes */}
            <Route
              path="/member/order"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <OrderPage />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requireAdmin>
                  <PageTransition>
                    <AdminDashboard />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/menu"
              element={
                <ProtectedRoute requireAdmin>
                  <PageTransition>
                    <MenuManagement />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin>
                  <PageTransition>
                    <UserManagement />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
