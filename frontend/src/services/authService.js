import client from '../api/client';

export const authService = {
  // Register new user
  register: async (name, email, password, confirmPassword) => {
    try {
      console.log('📝 Registering user...');
      const response = await client.post('/auth/register', {
        name,
        email,
        password,
        confirmPassword
      });

      // Save token and user to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      console.log('✅ Registration successful');
      return response.data;
    } catch (error) {
      console.error('❌ Registration error:', error);
      throw error;
    }
  },

  // Login existing user
  login: async (email, password) => {
    try {
      console.log('🔐 Logging in...');
      const response = await client.post('/auth/login', { email, password });

      // Save token and user to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      console.log('✅ Login successful');
      return response.data;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('✅ Logout successful');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
};