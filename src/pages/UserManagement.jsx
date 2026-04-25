import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { AdminNav } from '../components/AdminNav';
import { userService } from '../services/userService';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Create user form
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate password
    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    try {
      await userService.createUser(username, password, fullName, role);
      setSuccess(`Đã tạo tài khoản "${username}" thành công`);
      
      // Reset form
      setUsername('');
      setFullName('');
      setPassword('');
      setRole('MEMBER');
      
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tạo tài khoản');
    }
  };

  const handleDeleteUser = async (id, username) => {
    if (!confirm(`Bạn có chắc muốn xóa tài khoản "${username}"?`)) return;

    try {
      await userService.deleteUser(id);
      setSuccess(`Đã xóa tài khoản "${username}"`);
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa tài khoản');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <AdminNav />
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <AdminNav />
      <div className="container">
        {error && <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>}
        {success && <div className="success" style={{ marginBottom: '1rem' }}>{success}</div>}

        {/* Create User Form */}
        <div className="card">
          <h2>Tạo tài khoản mới</h2>
          <form onSubmit={handleCreateUser}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Tên đăng nhập *</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ví dụ: nguyenvana"
                  required
                  minLength={3}
                />
              </div>
              
              <div className="form-group">
                <label>Họ và tên *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu *</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 8 ký tự"
                  required
                  minLength={8}
                />
              </div>

              <div className="form-group">
                <label>Vai trò</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="MEMBER">Thành viên</option>
                  <option value="ADMIN">Quản trị viên</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn">Tạo tài khoản</button>
          </form>
        </div>

        {/* Users List */}
        <div className="card">
          <h2>Danh sách tài khoản ({users.length})</h2>
          
          {users.length === 0 ? (
            <p>Chưa có tài khoản nào.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên đăng nhập</th>
                  <th>Họ và tên</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td><strong>{user.username}</strong></td>
                    <td>{user.fullName}</td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        backgroundColor: user.role === 'ADMIN' ? '#fff3cd' : '#d1ecf1',
                        color: user.role === 'ADMIN' ? '#856404' : '#0c5460',
                      }}>
                        {user.role === 'ADMIN' ? 'Quản trị viên' : 'Thành viên'}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        backgroundColor: user.active ? '#d4edda' : '#f8d7da',
                        color: user.active ? '#155724' : '#721c24',
                      }}>
                        {user.active ? 'Hoạt động' : 'Vô hiệu hóa'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        className="btn btn-danger"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        disabled={user.role === 'ADMIN'}
                        title={user.role === 'ADMIN' ? 'Không thể xóa tài khoản Admin' : 'Xóa tài khoản'}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
