import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { requestPasswordReset } from '../apiservice/apiService'; // Import the API service function

const ForgotPassword = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('loginscreen/login');
  };

  const navigateToVerifyOtp = () => {
    navigation.navigate('loginscreen/verifyotp');
  };

  const [number, onChangeNumber] = useState('');

  const handleSendCode = async () => {
    if (!number) {
      Alert.alert('Error', 'Please enter your phone number.');
      return;
    }

    try {
      const response = await requestPasswordReset({ phone_number: number });

      if (response.data.success) {
        if (response.data.accountExists) {
          // Navigate to the OTP verification screen
          navigateToVerifyOtp();
        } else {
          // Account does not exist
          Alert.alert('Error', 'Account does not exist for this phone number.');
        }
      } else {
        // Show error message if the API call was not successful
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      // Handle network or other errors
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Forgot Password?</Text>
      <View style={styles.headerRowText}>
        <Text style={[styles.secondHeaderText, { fontWeight: '400', color: 'gray' }]}>Remember your password?</Text>
        <Text style={[styles.secondHeaderText, { color: '#D5715B' }]} onPress={navigateToLogin}>Login</Text>
      </View>

      <View style={styles.textInputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="phone" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={number}
            onChangeText={onChangeNumber}
            placeholder="Phone Number"
            placeholderTextColor={'gray'}
            style={styles.textInput}
            keyboardType='number-pad'
            returnKeyType='done'
          />
        </View>
      </View>

      <Pressable style={styles.sendCodeButton} onPress={handleSendCode}>
        <Text style={styles.sendCodeButtonText}>Send Code</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ForgotPassword;

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
  sendCodeButton: {
    backgroundColor: '#D5715B',
    height: 55,
    justifyContent: 'center',
    borderRadius: 32,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 1,
  },
  sendCodeButtonText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFF',
  },
});
