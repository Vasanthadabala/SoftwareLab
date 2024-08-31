import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../apiservice/apiService'; 

const Login = () => {
  const navigation = useNavigation();

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const navigateToForgot = () => {
    navigation.navigate('loginscreen/forgot');
  };

  const navigateToCreateAccount = () => {
    navigation.navigate('signupscreen/create_account');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);  // Start loading

    try {
      const response = await loginUser({ 
        email, 
        password, 
        role: 'farmer', 
        device_token: 'example_device_token', 
        type: 'email', 
        social_id: 'example_social_id' 
      });

      if (response.success) {
        // Handle successful login
        Alert.alert('Success', 'Login successful!');
        // Navigate to the next screen or store the token
        // Example: navigation.navigate('Home');
      } else {
        // Handle specific errors based on response.message
        switch(response.message) {
          case 'Email cannot be empty.':
          case 'Password cannot be empty.':
            Alert.alert('Error', response.message);
            break;
          case 'Invalid password.':
          case 'Account does not exist.':
            Alert.alert('Error', response.message);
            break;
          case 'Role not matched.':
          case 'Type not matched.':
          case 'Social id not matched.':
          case 'Social id cannot be empty.':
            Alert.alert('Error', response.message);
            break;
          case 'Account is not verified, please contact administrator.':
            Alert.alert('Error', response.message);
            break;
          default:
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      // Handle network or other errors
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Welcome back!</Text>
      <View style={styles.headerRowText}>
        <Text style={[styles.secondHeaderText, { fontWeight: '400', color: 'gray' }]}>New here?</Text>
        <Text style={[styles.secondHeaderText, { color: '#D5715B' }]} onPress={navigateToCreateAccount}>
          Create account
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="at" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={email}
            onChangeText={onChangeEmail}
            placeholder="Email"
            placeholderTextColor={'gray'}
            style={styles.textInput}
            keyboardType='email-address'
            returnKeyType='done'
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={password}
            onChangeText={onChangePassword}
            placeholder="Password"
            placeholderTextColor={'gray'}
            style={styles.textInput}
            secureTextEntry={true}
            returnKeyType='done'
          />
          <Pressable onPress={navigateToForgot}>
            <Text style={styles.forgotText}>Forgot?</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.loginButton} onPress={handleLogin}>
        {loading ? (  // Show loading indicator if loading
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </Pressable>

      <Text style={styles.orLoginText}>or Login With</Text>

      <View style={styles.socialButtonsContainer}>
        <Pressable style={styles.socialButton}>
          <Image source={require('../loginscreen/images/google.png')} style={styles.socialIcon} />
        </Pressable>
        <Pressable style={styles.socialButton}>
          <Image source={require('../loginscreen/images/apple.png')} style={styles.socialIcon} />
        </Pressable>
        <Pressable style={styles.socialButton}>
          <Image source={require('../loginscreen/images/facebook.png')} style={styles.socialIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
    marginTop: 10,
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
  forgotText: {
    color: '#D5715B',
    fontWeight: '500',
    marginLeft: 'auto',
  },
  loginButton: {
    backgroundColor: '#D5715B',
    height: 55,
    justifyContent: 'center',
    borderRadius: 32,
    marginHorizontal: 24,
    marginTop: 20,
    elevation: 1,
  },
  loginButtonText: {
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFF',
  },
  orLoginText: {
    marginTop: 32,
    textAlign: 'center',
    color: 'gray',
    fontWeight: '400',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  socialIcon: {
    width: 80,
    height: 35,
    borderRadius: 20,
    resizeMode: 'center',
  },
});
