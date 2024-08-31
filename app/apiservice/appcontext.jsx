import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create a context for the app
export const AppContext = createContext();

// Default state for form data
const defaultFormData = {
  user: {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
  },
  formInfo: {
    businessName: '',
    informalName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
  },
  verification: {
    isFileAttached: false,
  },
  businessHours: {
    selectedDays: [],
    selectedTimeSlots: [],
  },
};

// Context provider component
export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState(defaultFormData);

  // Utility function to reset form data to default
  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  return (
    <AppContext.Provider value={{ formData, setFormData, resetFormData }}>
      {children}
    </AppContext.Provider>
  );
};

// Prop types for the provider
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
