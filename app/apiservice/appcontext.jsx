import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create a context for the app
export const AppContext = createContext();

// Default state for form data
const defaultFormData = {
  user: {
    full_name: '', // Renamed from `username` to match API's naming conventions
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    role: '', // Added `role` to match API's expectations
    device_token: '', // Added `device_token`
    type: '', // Added `type` for email/social login type
    social_id: '', // Added `social_id` for social login
  },
  formInfo: {
    business_name: '',
    informal_name: '',
    address: '', // Updated to match the API's naming conventions
    city: '',
    state: '',
    zip_code: '', // Updated key to `zip_code`
    registration_proof: '', // Added registration proof field
  },
  verification: {
    is_file_attached: false,
    otp: '', // Added OTP field for verification
  },
  businessHours: {
    mon: [], // Changed to match API requirements for business hours
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  },
};

// Context provider component
export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState(defaultFormData);

  // Utility function to reset form data to default
  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  // Function to update user registration information
  const updateUserRegistration = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [key]: value,
      },
    }));
  };

  // Function to update form info (business information)
  const updateFormInfo = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      formInfo: {
        ...prevData.formInfo,
        [key]: value,
      },
    }));
  };

  // Function to update verification details
  const updateVerification = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      verification: {
        ...prevData.verification,
        [key]: value,
      },
    }));
  };

  // Function to update business hours details
  const updateBusinessHours = (day, timeSlots) => {
    setFormData((prevData) => ({
      ...prevData,
      businessHours: {
        ...prevData.businessHours,
        [day]: timeSlots,
      },
    }));
  };

  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        resetFormData,
        updateUserRegistration,
        updateFormInfo,
        updateVerification,
        updateBusinessHours,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Prop types for the provider
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};