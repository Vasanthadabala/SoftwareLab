import axios from 'axios';

// Base URL for the API
const BASE_URL = 'https://sowlab.com/assignment/';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Helper function to handle FormData
const buildFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] instanceof Object && !(data[key] instanceof File)) {
      formData.append(key, JSON.stringify(data[key])); // Stringify nested objects
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

// Function to handle user registration
export const registerUser = async (registerData) => {
  try {

    const preparedData = {
      ...registerData,
      social_id: registerData.social_id || '',
    };

    const formData = buildFormData(preparedData);

    const response = await api.post('/user/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success === true) { // Assuming API returns boolean true/false
      console.log('Registration successful:', response.data);
      return response.data;
    } else {
      console.error('Registration failed:', response.data.message);
      return response.data;
    }
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

    if (response.data.success === true) {
      console.log('Login successful:', response.data);
      return response.data;
    } else {
      console.error('Login failed:', response.data.message);
      return response.data;
    }
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

    if (response.data.success === true) {
      console.log('OTP sent successfully:', response.data);
      return response.data;
    } else {
      console.error('Error sending OTP:', response.data.message);
      return response.data;
    }
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

    if (response.data.success === true) {
      console.log('OTP verification successful:', response.data);
      return response.data;
    } else {
      console.error('OTP verification failed:', response.data.message);
      return response.data;
    }
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

    if (response.data.success === true) {
      console.log('Password reset successful:', response.data);
      return response.data;
    } else {
      console.error('Password reset failed:', response.data.message);
      return response.data;
    }
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