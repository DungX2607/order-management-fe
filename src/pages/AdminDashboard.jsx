import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { AdminNav } from '../components/AdminNav';
import { orderService } from '../services/orderService';
import { cycleService } from '../services/cycleService';

export default function AdminDashboard() {
  const [cycle, setCycle] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadData();
    }
  }, [statusFilter, searchTerm]);

  const loadData = async () => {
    try {
      const cycleData = await cycleService.getCurrentCycle();
      setCycle(cycleData);
      
      // Load orders with filters
      const ordersData = await orderService.getAllOrders(statusFilter, searchTerm);
      setOrders(ordersData);
      setFilteredOrders(ordersData);
    } catch (err) {
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCycle = async () => {
    if (!confirm('Bạn có chắc muốn mở chu kỳ mới?')) return;
    try {
      await cycleService.openCycle();
      setSuccess('Đã mở chu kỳ mới');
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể mở chu kỳ');
    }
  };

  const handleCloseCycle = async () => {
    if (!confirm('Bạn có chắc muốn đóng chu kỳ hiện tại?')) return;
    try {
      await cycleService.closeCycle();
      setSuccess('Đã đóng chu kỳ');
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể đóng chu kỳ');
    }
  };

  const handleTogglePickup = async (orderId) => {
    try {
      await orderService.togglePickup(orderId);
      // Update local state
      setOrders(orders.map(o => 
        o.id === orderId ? { ...o, pickedUp: !o.pickedUp } : o
      ));
      setSuccess('Đã cập nhật trạng thái');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Không thể cập nhật trạng thái');
    }
  };

  const handleExportExcel = () => {
    const token = localStorage.getItem('token');
    window.open(`http://localhost:8080/api/export/excel?token=${token}`, '_blank');
  };

  const formatTimeRemaining = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const stats = {
    total: orders.length,
    picked: orders.filter(o => o.pickedUp).length,
    unpicked: orders.filter(o => !o.pickedUp).length,
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

  const isCycleOpen = cycle?.status === 'OPEN';

  return (
    <>
      <Header />
      <AdminNav />
      <div className="container">
        {/* Cycle Control */}
        <div className="card">
          <h2>Điều khiển chu kỳ</h2>
          {cycle && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: isCycleOpen ? '#d4edda' : '#f8d7da',
                  color: isCycleOpen ? '#155724' : '#721c24',
                }}>
                  {isCycleOpen ? 'Đang mở' : 'Đã đóng'}
                </span>
                <span>
                  {isCycleOpen 
                    ? `Còn lại: ${formatTimeRemaining(cycle.timeLeft)}`
                    : `Chu kỳ tiếp theo: ${new Date(cycle.nextCycleTime).toLocaleString('vi-VN')}`
                  }
                </span>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleOpenCycle} className="btn" disabled={isCycleOpen}>
              Mở chu kỳ
            </button>
            <button onClick={handleCloseCycle} className="btn btn-danger" disabled={!isCycleOpen}>
              Đóng chu kỳ
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="card">
          <h2>Thống kê</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.total}</div>
              <div style={styles.statLabel}>Tổng đơn</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.picked}</div>
              <div style={styles.statLabel}>Đã lấy</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.unpicked}</div>
              <div style={styles.statLabel}>Chưa lấy</div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="card">
          <h2>Danh sách đơn hàng</h2>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ flex: 1, minWidth: '200px', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="picked">Đã lấy</option>
              <option value="unpicked">Chưa lấy</option>
            </select>

            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, minWidth: '200px', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />

            <button onClick={handleExportExcel} className="btn">
              📥 Xuất Excel
            </button>
          </div>

          {/* Orders Table */}
          {filteredOrders.length === 0 ? (
            <p>Chưa có đơn hàng nào.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Username</th>
                  <th>Họ tên</th>
                  <th>Danh mục</th>
                  <th>Đồ uống</th>
                  <th>Ghi chú</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td><strong>{order.username}</strong></td>
                    <td>{order.memberName}</td>
                    <td>{order.categoryName}</td>
                    <td>{order.menuItemName}</td>
                    <td>{order.note || '-'}</td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        backgroundColor: order.pickedUp ? '#d1ecf1' : '#fff3cd',
                        color: order.pickedUp ? '#0c5460' : '#856404',
                      }}>
                        {order.pickedUp ? 'Đã lấy' : 'Chưa lấy'}
                      </span>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={order.pickedUp}
                        onChange={() => handleTogglePickup(order.id)}
                      />
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

const styles = {
  statCard: {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666',
  },
};
