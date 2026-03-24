/**
 * API Service
 * Handles all API calls to the backend
 */

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to all requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Error registering user' };
  }
};

/**
 * Login user
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Error logging in' };
  }
};

// Book APIs

/**
 * Get all books
 */
export const getAllBooks = async () => {
  try {
    const response = await api.get('/books');
    console.log('📚 Books API Response:', response.data);
    
    // Ensure books array exists
    if (!response.data.books) {
      response.data.books = [];
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching books:', error);
    return { success: false, message: 'Error fetching books', books: [] };
  }
};

/**
 * Get single book by ID
 */
export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, message: 'Error fetching book' };
  }
};

/**
 * Create a new book
 */
export const createBook = async (bookData) => {
  try {
    console.log('📝 Creating book with data:', bookData);
    const response = await api.post('/books', bookData);
    console.log('✅ Book created response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating book:', error.response?.data || error.message);
    return error.response?.data || { success: false, message: 'Error creating book' };
  }
};

/**
 * Update a book
 */
export const updateBook = async (id, bookData) => {
  try {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Error updating book' };
  }
};

/**
 * Delete a book
 */
export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Error deleting book' };
  }
};

export default api;
