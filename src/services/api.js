import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/users'; // Remove /register from base URL

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const fetchUserProfile = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};