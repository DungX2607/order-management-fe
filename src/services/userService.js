import axios from '../api/axios';

export const userService = {
  getAllUsers: async () => {
    const response = await axios.get('/users');
    return response.data;
  },

  createUser: async (username, password, fullName, role) => {
    const response = await axios.post('/users', { 
      username, 
      password, 
      fullName, 
      role 
    });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`/users/${id}`);
    return response.data;
  },
};
