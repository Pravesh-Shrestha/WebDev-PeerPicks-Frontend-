import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/user'; // Adjust as necessary

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // Returns user data or token
};

export const fetchUserProfile = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data; // Returns user profile data
};