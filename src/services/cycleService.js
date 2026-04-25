import axios from '../api/axios';

export const cycleService = {
  getCurrentCycle: async () => {
    const response = await axios.get('/cycles/current');
    return response.data;
  },

  openCycle: async () => {
    const response = await axios.post('/cycles/open');
    return response.data;
  },

  closeCycle: async () => {
    await axios.post('/cycles/close');
  },
};
