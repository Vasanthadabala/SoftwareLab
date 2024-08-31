import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API calls

const VerifyOtp = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // State to store each OTP digit separately
  const inputs = useRef([]); // Refs to manage input focus
  const [resending, setResending] = useState(false); // State to handle resend button loading

  const navigateToForgot = () => {
    navigation.navigate('loginscreen/login');
  };

  const navigateToResetPassword = () => {
    navigation.navigate('loginscreen/resetpassword');
  };

  const handleChangeText = (text, index) => {
    // Update the current OTP digit
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically focus the next input
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    } else if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join(''); // Combine OTP digits into a single string
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter a complete OTP.');
      return;
    }
    
    try {
      const response = await axios.post('https://your-api-url.com/verify-otp', { otp: otpCode });
      if (response.data.success) {
        navigateToResetPassword(); // Navigate to reset password screen on success
      } else {
        Alert.alert('Verification Failed', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while verifying the OTP. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setResending(true);
    try {
      const response = await axios.post('https://your-api-url.com/resend-otp');
      if (response.data.success) {
        Alert.alert('OTP Resent', 'A new OTP has been sent to your phone.');
      } else {
        Alert.alert('Resend Failed', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while resending the OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Verify OTP</Text>
      <View style={styles.headerRowText}>
        <Text style={[styles.secondHeaderText, { fontWeight: '400', color: 'gray' }]}>Remember your password?</Text>
        <Text style={[styles.secondHeaderText, { color: '#D5715B' }]} onPress={navigateToForgot}>Login</Text>
      </View>

      <View style={styles.otpInputContainer}>
        {/* Render 6 input fields for OTP */}
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)} // Store refs to inputs
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            placeholder=""
            placeholderTextColor={'gray'}
            style={styles.otpInput}
            keyboardType='number-pad'
            returnKeyType='done'
            maxLength={1} // Limit each input to 1 character
          />
        ))}
      </View>

      <Pressable style={styles.sendCodeButton} onPress={handleSubmit}>
        <Text style={styles.sendCodeButtonText}>Submit</Text>
      </Pressable>

      <TouchableOpacity style={styles.resendCodeButton} onPress={handleResendCode} disabled={resending}>
        <Text style={styles.resendCodeButtonText}>{resending ? 'Sending...' : 'Resend Code'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerifyOtp;

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
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginHorizontal: 20,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    backgroundColor: '#ededed',
  },
  sendCodeButton: {
    backgroundColor: '#D5715B',
    height: 55,
    justifyContent: 'center',
    borderRadius: 32,
    marginHorizontal: 24,
    marginTop: 30,
    elevation: 1,
  },
  sendCodeButtonText: {
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFF',
  },
  resendCodeButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  resendCodeButtonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
});
