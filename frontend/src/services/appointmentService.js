import client from '../api/client';

export const appointmentService = {
  getAll: async () => {
    try {
      const response = await client.get('/appointments');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  create: async (appointmentData) => {
    try {
      const response = await client.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }
};