// Authentication service for handling API requests related to auth
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8000/api';
const AUTH_TOKEN_KEY = 'authToken';

/**
 * Send OTP to the provided email for registration
 * @param {string} email - User's email address
 * @returns {Promise} - Response from the API
 */
export const sendOTP = async (email) => {
  try {
    const response = await fetch(`${API_URL}/otp/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send OTP');
    }
    
    return data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

/**
 * Verify OTP and register user
 * @param {string} email - User's email address
 * @param {string} otp - OTP received by user
 * @param {object} userData - User registration data
 * @returns {Promise} - Response from the API
 */
export const verifyOTPAndRegister = async (email, otp, userData) => {
  try {
    const response = await fetch(`${API_URL}/otp/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp,
        userData: {
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
          age: userData.age,
          password: userData.password,
        },
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify OTP and register');
    }
    
    // Store JWT token in AsyncStorage if registration is successful
    if (data.token) {
      await storeAuthToken(data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Error verifying OTP and registering:', error);
    throw error;
  }
};

/**
 * Store authentication token
 * @param {string} token - JWT token
 */
export const storeAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

/**
 * Get authentication token
 * @returns {Promise} - JWT token or null if not found
 */
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Remove authentication token (logout)
 */
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};