import { Link, useLocation } from 'react-router-dom';

export const AdminNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <Link 
        to="/admin/dashboard" 
        style={{...styles.link, ...(isActive('/admin/dashboard') ? styles.activeLink : {})}}
      >
        Quản lý đơn
      </Link>
      <Link 
        to="/admin/menu" 
        style={{...styles.link, ...(isActive('/admin/menu') ? styles.activeLink : {})}}
      >
        Quản lý menu
      </Link>
      <Link 
        to="/admin/users" 
        style={{...styles.link, ...(isActive('/admin/users') ? styles.activeLink : {})}}
      >
        Quản lý tài khoản
      </Link>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    gap: '2rem',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 500,
    padding: '0.5rem 0',
    borderBottom: '2px solid transparent',
  },
  activeLink: {
    color: '#4CAF50',
    borderBottom: '2px solid #4CAF50',
  },
};
