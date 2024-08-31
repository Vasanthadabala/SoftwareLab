import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { resetPassword } from '../apiservice/apiService'; // Import the API service function

const ResetPassword = () => {
  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State for controlling alert visibility
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const navigateToLogin = () => {
    navigation.navigate('loginscreen/login');
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      // Show an alert if any of the fields are empty
      setAlertTitle("Missing Info");
      setAlertMessage("Please fill in all fields.");
      setShowAlert(true);
    } else if (newPassword !== confirmPassword) {
      // Show an alert if passwords do not match
      setAlertTitle("Mismatch");
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
    } else {
      try {
        // Call the API to reset the password
        const response = await resetPassword({ newPassword }); // Make sure the API function is defined correctly in apiService
        
        if (response.data.success) {
          setAlertTitle("Success");
          setAlertMessage("Password reset successful!");
          setShowAlert(true);
        } else {
          setAlertTitle("Error");
          setAlertMessage(response.data.message || "Failed to reset password. Please try again.");
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        setAlertTitle("Error");
        setAlertMessage("An error occurred. Please try again.");
        setShowAlert(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Reset Password</Text>
      <View style={styles.headerRowText}>
        <Text style={[styles.secondHeaderText, { fontWeight: '400', color: 'gray' }]}>Remember your password?</Text>
        <Text style={[styles.secondHeaderText, { color: '#D5715B' }]} onPress={navigateToLogin}>Login</Text>
      </View>

      <View style={styles.textInputContainer}>
        {/* New Password Input */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            placeholderTextColor={'gray'}
            style={styles.textInput}
            secureTextEntry={true}
            returnKeyType='done'
          />
        </View>

        {/* Confirm New Password Input */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm New Password"
            placeholderTextColor={'gray'}
            style={styles.textInput}
            secureTextEntry={true}
            returnKeyType='done'
          />
        </View>
      </View>

      {/* Submit Button */}
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>

      {/* Custom Alert */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        titleStyle={styles.alertTitle}  // Custom style for title
        message={alertMessage}
        messageStyle={styles.alertMessage}  // Custom style for message
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#D5715B"  // Consistent button color
        confirmButtonStyle={styles.confirmButton}  // Custom style for button
        onConfirmPressed={() => {
          setShowAlert(false);
          if (alertTitle === "Success") {
            navigateToLogin(); // Navigate to login screen on success
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  headerText: {
    marginTop: 100,
    marginStart: 20,
    fontSize: 34,
    fontWeight: '700',
  },
  headerRowText: {
    flexDirection: 'row',
    marginTop: 20,
    marginStart: 20,
  },
  secondHeaderText: {
    fontSize: 16,
    fontWeight: '500',
    marginEnd: 10,
  },
  textInputContainer: {
    marginTop: 60,
    marginHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 8,
    color: 'black',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    paddingVertical: 10,
    height: 50,
  },
  submitButton: {
    backgroundColor: '#D5715B',
    height: 55,
    justifyContent: 'center',
    borderRadius: 32,
    marginHorizontal: 24,
    marginTop: 20,
    elevation: 1,
  },
  submitButtonText: {
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFF',
  },
  alertTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  alertMessage: {
    fontSize: 16,
    color: '#666',
  },
  confirmButton: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
