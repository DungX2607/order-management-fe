import axios from '../api/axios';

export const menuService = {
  getCategories: async () => {
    const response = await axios.get('/categories');
    return response.data;
  },

  getMenuItems: async () => {
    const response = await axios.get('/menu-items');
    return response.data;
  },

  createCategory: async (name, displayOrder) => {
    const response = await axios.post('/categories', { name, displayOrder });
    return response.data;
  },

  deleteCategory: async (id) => {
    await axios.delete(`/categories/${id}`);
  },

  createMenuItem: async (categoryId, name, displayOrder) => {
    const response = await axios.post('/menu-items', { categoryId, name, displayOrder });
    return response.data;
  },

  deleteMenuItem: async (id) => {
    await axios.delete(`/menu-items/${id}`);
  },
};
