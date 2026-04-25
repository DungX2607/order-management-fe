import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>🥤 Hệ thống Đặt Nước</h1>
      <div style={styles.actions}>
        <span style={styles.userInfo}>
          {user?.role === 'ADMIN' ? 'Admin: ' : ''}
          {user?.fullName}
        </span>
        <button onClick={handleLogout} className="btn btn-secondary">
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    color: '#4CAF50',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  userInfo: {
    fontSize: '0.9rem',
    color: '#666',
  },
};
