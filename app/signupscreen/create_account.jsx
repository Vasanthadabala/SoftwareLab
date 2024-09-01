import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../apiservice/appcontext';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your webClientId
  offlineAccess: false,
});

const CreateAccount = () => {
  const navigation = useNavigation();
  const { formData, updateUserRegistration } = useContext(AppContext);

  useEffect(() => {
    // Optionally check if the user is already signed in
    GoogleSignin.getCurrentUser()
      .then(user => {
        if (user) {
          // Handle user already signed in
          console.log('User is already signed in:', user);
        }
      })
      .catch(error => console.error('GoogleSignin.getCurrentUser error:', error));
  }, []);

  const navigateToLogin = () => {
    navigation.navigate('loginscreen/login');
  };

  const navigateToFormInfo = () => {
    if (validateForm()) {
      navigation.navigate('signupscreen/forminfo');
    }
  };

  const validateForm = () => {
    const { username, email, phone, password, confirmPassword } = formData.user;

    if (!username || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken, user } = userInfo;

      // Now you can use the Google ID token for authentication with your server
      console.log('Google ID Token:', idToken);
      console.log('Google User Info:', user);

      // Optionally navigate or handle user info here
      Alert.alert('Google Login Success', `Welcome, ${user.name}!`);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login Cancelled', 'Google login was cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login In Progress', 'Google login is in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services Not Available', 'Google Play Services are not available.');
      } else {
        Alert.alert('Login Error', `An error occurred: ${error.message}`);
      }
    }
  };

  // Social Login Handlers (Placeholder)
  const handleAppleLogin = () => {
    Alert.alert('Info', 'Apple login is not implemented yet.');
  };

  const handleFacebookLogin = () => {
    Alert.alert('Info', 'Facebook login is not implemented yet.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView contentContainerStyle={styles.flexGrow}>
          <Text style={[styles.secondHeaderText, { fontWeight: '400', color: 'gray' }]}>Signup 1 of 4</Text>
          <Text style={styles.headerText}>Welcome!</Text>

          <View style={styles.socialButtonsContainer}>
            <Pressable style={styles.socialButton} onPress={handleGoogleLogin}>
              <Image source={require('../loginscreen/images/google.png')} style={styles.socialIcon} />
            </Pressable>
            <Pressable style={styles.socialButton} onPress={handleAppleLogin}>
              <Image source={require('../loginscreen/images/apple.png')} style={styles.socialIcon} />
            </Pressable>
            <Pressable style={styles.socialButton} onPress={handleFacebookLogin}>
              <Image source={require('../loginscreen/images/facebook.png')} style={styles.socialIcon} />
            </Pressable>
          </View>

          <Text style={styles.orSignUpText}>or Sign Up With</Text>

          <View style={styles.textInputContainer}>
            {/* Username Input */}
            <View style={styles.inputWrapper}>
              <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
              <TextInput
                value={formData.user.username}
                onChangeText={(text) => updateUserRegistration('username', text)}
                placeholder="Username"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                returnKeyType="done"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Icon name="at" size={20} color="gray" style={styles.inputIcon} />
              <TextInput
                value={formData.user.email}
                onChangeText={(text) => updateUserRegistration('email', text)}
                placeholder="Email"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                keyboardType="email-address"
                returnKeyType="done"
              />
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputWrapper}>
              <Icon name="phone" size={20} color="gray" style={styles.inputIcon} />
              <TextInput
                value={formData.user.phone}
                onChangeText={(text) => updateUserRegistration('phone', text)}
                placeholder="Phone Number"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                keyboardType="phone-pad"
                returnKeyType="done"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
              <TextInput
                value={formData.user.password}
                onChangeText={(text) => updateUserRegistration('password', text)}
                placeholder="Password"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                secureTextEntry={true}
                returnKeyType="done"
              />
            </View>

            {/* Re-enter Password Input */}
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
              <TextInput
                value={formData.user.confirmPassword}
                onChangeText={(text) => updateUserRegistration('confirmPassword', text)}
                placeholder="Re-enter Password"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                secureTextEntry={true}
                returnKeyType="done"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <Pressable style={styles.continueButton} onPress={navigateToFormInfo}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  headerText: {
    marginTop: 10,
    marginStart: 20,
    fontSize: 34,
    fontWeight: '700',
  },
  secondHeaderText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginStart: 20,
  },
  textInputContainer: {
    marginTop: 40,
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
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
    paddingVertical: 10,
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#D5715B',
    flex: 1,
    marginRight: 10,
  },
  loginButtonText: {
    color: '#D5715B',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#D5715B',
    height: 50,
    justifyContent: 'center',
    borderRadius: 32,
    flex: 1,
    marginLeft: 10,
    elevation: 1,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFF',
  },
  orSignUpText: {
    marginTop: 32,
    textAlign: 'center',
    color: 'gray',
    fontWeight: '400',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
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