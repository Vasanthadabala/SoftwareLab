import axios from 'axios';

// Base URL for the API
const BASE_URL = 'https://sowlab.com/assignment/';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout for the request (10 seconds)
});

// Helper function to handle FormData
const buildFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] instanceof Object && !(data[key] instanceof File)) {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

// Function to handle user registration
export const registerUser = async (registerData) => {
  try {
    // Create FormData instance and ensure social_id is included
    const formData = buildFormData(registerData);
    formData.append('social_id', '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx'); // Use the provided social_id

    const response = await api.post('/user/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set Content-Type only for FormData
      },
    });

    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Error registering user');
  }
};

// Function to handle user login
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/user/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Error logging in');
  }
};

// Function to handle forgot password
export const forgotPassword = async (forgotPasswordData) => {
  try {
    const response = await api.post('/user/forgot-password', forgotPasswordData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Forgot password response:', response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Error sending OTP');
  }
};

// Function to handle OTP verification
export const verifyOtp = async (verifyOtpData) => {
  try {
    const response = await api.post('/user/verify-otp', verifyOtpData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('OTP verification response:', response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Error verifying OTP');
  }
};

// Function to handle password reset
export const resetPassword = async (resetPasswordData) => {
  try {
    const response = await api.post('/user/reset-password', resetPasswordData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Password reset response:', response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Error resetting password');
  }
};

// Helper function to handle errors
const handleError = (error, message) => {
  if (error.response) {
    console.error(`${message} - ${error.response.status}: ${error.response.data.message}`);
  } else if (error.request) {
    console.error(`${message} - No response received: ${error.request}`);
  } else {
    console.error(`${message} - ${error.message}`);
  }
  throw error;
};