import axios from "axios";

// Define base URL for the API
const API_URL = "http://localhost:5000/api"; // Update with your actual backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// User API Calls
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Registration failed");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Login failed");
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await api.get("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Failed to fetch profile");
  }
};

// Rating API Calls
export const getAllRatings = async () => {
  try {
    const response = await api.get("/ratings/getAllRatings");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error fetching ratings");
  }
};

export const getRatingById = async (id) => {
  try {
    const response = await api.get(`/ratings/getRatingsById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error fetching rating");
  }
};

export const addRating = async (ratingData) => {
  try {
    const response = await api.post("/ratings/addRating", ratingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error creating rating");
  }
};

export const updateRating = async (id, ratingData) => {
  try {
    const response = await api.put(`/ratings/updateRating/${id}`, ratingData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error updating rating");
  }
};

export const deleteRating = async (id) => {
  try {
    const response = await api.delete(`/ratings/deleteRating/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error deleting rating");
  }
};

// Business API Calls
export const getAllBusinesses = async () => {
  try {
    const response = await api.get("/businesses/getAllBusiness");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error fetching businesses");
  }
};

export const getBusinessById = async (id) => {
  try {
    const response = await api.get(`/businesses/getBusinessById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error fetching business");
  }
};

export const addBusiness = async (businessData) => {
  try {
    const response = await api.post("/businesses/addBusiness", businessData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error creating business");
  }
};

export const updateBusiness = async (id, businessData) => {
  try {
    const response = await api.put(`/businesses/updateBusiness/${id}`, businessData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error updating business");
  }
};

export const deleteBusiness = async (id) => {
  try {
    const response = await api.delete(`/businesses/deleteBusiness/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error deleting business");
  }
};

// Message API Calls
export const getAllMessages = async () => {
  try {
    const response = await api.get("/messages/getAllMessages");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error fetching messages");
  }
};

export const getMessageById = async (id) => {
  try {
    const response = await api.get(`/messages/getMessagesById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error fetching message");
  }
};

export const addMessage = async (messageData) => {
  try {
    const response = await api.post("/messages/addMessage", messageData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error creating message");
  }
};

export const deleteMessage = async (id) => {
  try {
    const response = await api.delete(`/messages/deleteMessage/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Error deleting message");
  }
};

export default api;
