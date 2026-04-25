import axios from '../api/axios';

export const orderService = {
  getMyOrder: async () => {
    const response = await axios.get('/orders/my');
    return response.data;
  },

  createOrder: async (menuItemId, note) => {
    const response = await axios.post('/orders', { menuItemId, note });
    return response.data;
  },

  updateOrder: async (id, menuItemId, note) => {
    const response = await axios.put(`/orders/${id}`, { menuItemId, note });
    return response.data;
  },

  getAllOrders: async (status, memberName) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (memberName) params.append('memberName', memberName);
    const response = await axios.get(`/orders?${params.toString()}`);
    return response.data;
  },

  togglePickup: async (id) => {
    await axios.patch(`/orders/${id}/pickup`);
  },
};
