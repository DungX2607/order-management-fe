import axios from '../api/axios';

export const authService = {
  login: async (username, password) => {
    const response = await axios.post('/auth/login', { username, password });
    return response.data;
  },

  logout: async () => {
    await axios.post('/auth/logout');
  },
};
