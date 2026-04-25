import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { orderService } from '../services/orderService';
import { menuService } from '../services/menuService';
import { cycleService } from '../services/cycleService';

export default function OrderPage() {
  const [cycle, setCycle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [myOrder, setMyOrder] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [cycleData, categoriesData, menuItemsData] = await Promise.all([
        cycleService.getCurrentCycle(),
        menuService.getCategories(),
        menuService.getMenuItems(),
      ]);

      setCycle(cycleData);
      setCategories(categoriesData);
      setMenuItems(menuItemsData);

      // Load existing order if any
      if (cycleData.status === 'OPEN') {
        try {
          const orderData = await orderService.getMyOrder();
          setMyOrder(orderData);
          setSelectedItemId(orderData.menuItemId.toString());
          setNote(orderData.note || '');
        } catch (err) {
          // No order yet
        }
      }
    } catch (err) {
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedItemId) {
      setError('Vui lòng chọn đồ uống');
      return;
    }

    try {
      if (myOrder) {
        await orderService.updateOrder(myOrder.id, parseInt(selectedItemId), note);
        setSuccess('Đã cập nhật đơn hàng thành công!');
      } else {
        await orderService.createOrder(parseInt(selectedItemId), note);
        setSuccess('Đã đặt hàng thành công!');
      }
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const formatTimeRemaining = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <>
        <Header />
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
      <div className="container">
        {/* Cycle Status */}
        <div className="card">
          <h2>Trạng thái chu kỳ</h2>
          {cycle && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
          )}
        </div>

        {/* Order Form */}
        <div className="card">
          <h2>Đơn đặt nước của bạn</h2>
          
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit}>
            {/* Menu by Category */}
            {categories.map(category => {
              const items = menuItems.filter(item => 
                item.categoryId === category.id && item.active
              );
              
              if (items.length === 0) return null;

              return (
                <div key={category.id} style={{ marginBottom: '2rem' }}>
                  <h3 style={{ 
                    color: '#4CAF50', 
                    marginBottom: '1rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '2px solid #4CAF50'
                  }}>
                    {category.name}
                  </h3>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {items.map(item => (
                      <label key={item.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: isCycleOpen ? 'pointer' : 'not-allowed',
                        backgroundColor: selectedItemId === item.id.toString() ? '#f0f8f0' : 'white',
                      }}>
                        <input
                          type="radio"
                          name="menuItem"
                          value={item.id}
                          checked={selectedItemId === item.id.toString()}
                          onChange={(e) => setSelectedItemId(e.target.value)}
                          disabled={!isCycleOpen}
                          style={{ marginRight: '0.75rem' }}
                        />
                        {item.name}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="form-group">
              <label>Ghi chú (tùy chọn)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: ít đá, nhiều đường..."
                disabled={!isCycleOpen}
                rows="3"
              />
            </div>

            <button type="submit" className="btn" disabled={!isCycleOpen}>
              {isCycleOpen 
                ? (myOrder ? 'Cập nhật đơn hàng' : 'Đặt hàng')
                : 'Chu kỳ đã đóng'
              }
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
