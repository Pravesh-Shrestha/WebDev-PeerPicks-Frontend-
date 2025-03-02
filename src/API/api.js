import axios from "axios";

// Define base URL for the API
const API_URL = "http://localhost:5000/api"; // Update with your actual backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to handle errors consistently
const handleApiError = (error, defaultMessage) => {
  const errorMessage = 
    error.response?.data?.error || 
    error.message || 
    defaultMessage;
  
  throw new Error(errorMessage);
};

// Helper function to set auth token in requests
const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// User API Calls
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Registration failed");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    handleApiError(error, "Login failed");
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await api.get("/users/profile", getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch profile");
  }
};

// Rating API Calls
export const getAllRatings = async (token) => {
  try {
    const response = await api.get("/ratings", getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching ratings");
  }
};

export const getRatingById = async (id, token) => {
  try {
    const response = await api.get(`/ratings/${id}`, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching rating");
  }
};

export const addRating = async (ratingData, token) => {
  try {
    const response = await api.post("/ratings", ratingData, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error creating rating");
  }
};

export const updateRating = async (id, ratingData, token) => {
  try {
    const response = await api.put(`/ratings/${id}`, ratingData, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error updating rating");
  }
};

export const deleteRating = async (id, token) => {
  try {
    const response = await api.delete(`/ratings/${id}`, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error deleting rating");
  }
};

// Business API Calls
export const getAllBusinesses = async () => {
  try {
    const response = await api.get("/businesses");
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching businesses");
  }
};

export const getBusinessById = async (id) => {
  try {
    const response = await api.get(`/businesses/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching business");
  }
};

export const addBusiness = async (businessData, token) => {
  try {
    const response = await api.post("/businesses", businessData, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error creating business");
  }
};

export const updateBusiness = async (id, businessData, token) => {
  try {
    const response = await api.put(`/businesses/${id}`, businessData, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error updating business");
  }
};

export const deleteBusiness = async (id, token) => {
  try {
    const response = await api.delete(`/businesses/${id}`, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error deleting business");
  }
};

// Message API Calls
export const getAllMessages = async (token) => {
  try {
    const response = await api.get("/messages", getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching messages");
  }
};

export const getMessageById = async (id, token) => {
  try {
    const response = await api.get(`/messages/${id}`, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching message");
  }
};

export const addMessage = async (messageData, token) => {
  try {
    const response = await api.post("/messages", messageData, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error creating message");
  }
};

export const deleteMessage = async (id, token) => {
  try {
    const response = await api.delete(`/messages/${id}`, getAuthHeader(token));
    return response.data;
  } catch (error) {
    handleApiError(error, "Error deleting message");
  }
};

export default api;