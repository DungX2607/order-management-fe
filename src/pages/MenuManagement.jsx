import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { AdminNav } from '../components/AdminNav';
import { menuService } from '../services/menuService';

export default function MenuManagement() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Category form
  const [categoryName, setCategoryName] = useState('');
  const [categoryOrder, setCategoryOrder] = useState(0);

  // MenuItem form
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemOrder, setItemOrder] = useState(0);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const [categoriesData, menuItemsData] = await Promise.all([
        menuService.getCategories(),
        menuService.getMenuItems(),
      ]);
      setCategories(categoriesData);
      setMenuItems(menuItemsData);
    } catch (err) {
      setError('Không thể tải menu');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await menuService.createCategory(categoryName, categoryOrder);
      setSuccess('Đã thêm danh mục thành công');
      setCategoryName('');
      setCategoryOrder(0);
      await loadMenu();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể thêm danh mục');
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) return;

    try {
      await menuService.deleteCategory(id);
      setSuccess('Đã xóa danh mục');
      await loadMenu();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa danh mục');
    }
  };

  const handleCreateMenuItem = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedCategoryId) {
      setError('Vui lòng chọn danh mục');
      return;
    }

    try {
      await menuService.createMenuItem(parseInt(selectedCategoryId), itemName, itemOrder);
      setSuccess('Đã thêm món thành công');
      setItemName('');
      setItemOrder(0);
      await loadMenu();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể thêm món');
    }
  };

  const handleDeleteMenuItem = async (id, name) => {
    if (!confirm(`Bạn có chắc muốn xóa món "${name}"?`)) return;

    try {
      await menuService.deleteMenuItem(id);
      setSuccess('Đã xóa món');
      await loadMenu();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa món');
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

        {/* Add Category */}
        <div className="card">
          <h2>Thêm danh mục mới</h2>
          <form onSubmit={handleCreateCategory}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 2 }}>
                <label>Tên danh mục</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ví dụ: Highland Coffee"
                  required
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Thứ tự hiển thị</label>
                <input
                  type="number"
                  value={categoryOrder}
                  onChange={(e) => setCategoryOrder(parseInt(e.target.value))}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn">Thêm danh mục</button>
          </form>
        </div>

        {/* Add Menu Item */}
        <div className="card">
          <h2>Thêm món đồ uống</h2>
          <form onSubmit={handleCreateMenuItem}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Danh mục</label>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ flex: 2 }}>
                <label>Tên món</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Ví dụ: Trà sữa trân châu"
                  required
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Thứ tự</label>
                <input
                  type="number"
                  value={itemOrder}
                  onChange={(e) => setItemOrder(parseInt(e.target.value))}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn">Thêm món</button>
          </form>
        </div>

        {/* Menu List */}
        <div className="card">
          <h2>Danh sách menu</h2>
          {categories.length === 0 ? (
            <p>Chưa có danh mục nào. Hãy thêm danh mục mới.</p>
          ) : (
            categories.map(category => {
              const items = menuItems.filter(item => item.categoryId === category.id);
              
              return (
                <div key={category.id} style={{ marginBottom: '2rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}>
                    <h3 style={{ margin: 0 }}>
                      {category.name} <span style={{ color: '#666', fontSize: '0.9rem' }}>(Thứ tự: {category.displayOrder})</span>
                    </h3>
                    <button 
                      onClick={() => handleDeleteCategory(category.id, category.name)}
                      className="btn btn-danger"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                      Xóa danh mục
                    </button>
                  </div>

                  {items.length === 0 ? (
                    <p style={{ color: '#666', fontStyle: 'italic' }}>Chưa có món nào</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Tên món</th>
                          <th>Thứ tự</th>
                          <th>Trạng thái</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.sort((a, b) => a.displayOrder - b.displayOrder).map(item => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.displayOrder}</td>
                            <td>
                              <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                backgroundColor: item.active ? '#d4edda' : '#f8d7da',
                                color: item.active ? '#155724' : '#721c24',
                              }}>
                                {item.active ? 'Hoạt động' : 'Ẩn'}
                              </span>
                            </td>
                            <td>
                              <button 
                                onClick={() => handleDeleteMenuItem(item.id, item.name)}
                                className="btn btn-danger"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
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
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
