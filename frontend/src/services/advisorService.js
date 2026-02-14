import client from '../api/client';

export const advisorService = {
  getAll: async () => {
    try {
      const response = await client.get('/advisors');
      return response.data;
    } catch (error) {
      console.error('Error fetching advisors:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await client.get(`/advisors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching advisor:', error);
      throw error;
    }
  }
};