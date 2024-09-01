import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../apiservice/appcontext';

const FormInfo = () => {
  const navigation = useNavigation();
  const { formData, updateFormInfo } = useContext(AppContext);  // Use updateFormInfo method from context

  const navigateToCreateAccount = () => {
    navigation.navigate('signupscreen/create_account');
  };

  const navigateToVerification = () => {
    if (validateForm()) {
      navigation.navigate('signupscreen/verification');
    }
  };

  const validateForm = () => {
    const { businessName, informalName, streetAddress, city, state, zipcode } = formData.formInfo;

    if (!businessName || !informalName || !streetAddress || !city || !state || !zipcode) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    const zipcodeRegex = /^[0-9]{5}$/; // Assuming a 5-digit US zipcode
    if (!zipcodeRegex.test(zipcode)) {
      Alert.alert('Validation Error', 'Please enter a valid 5-digit zipcode.');
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView contentContainerStyle={styles.flexGrow}>
          <Text style={[styles.secondHeaderText, { fontWeight: '400', color: 'gray' }]}>Signup 2 of 4</Text>

          <Text style={styles.headerText}>Form Info</Text>

          <View style={styles.textInputContainer}>
            {/* Business Name Input */}
            <View style={styles.inputWrapper}>
              <Icon name="briefcase" size={20} color="gray" style={styles.inputIcon} />
              <TextInput
                value={formData.formInfo.businessName}
                onChangeText={(text) => updateFormInfo('businessName', text)}  // Update state using context method
                placeholder="Business Name"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                returnKeyType="done"
              />
            </View>

            {/* Informal Name Input */}
            <View style={styles.inputWrapper}>
              <Icon name="id-card" size={20} color="gray" style={styles.inputIcon} />
              <TextInput
                value={formData.formInfo.informalName}
                onChangeText={(text) => updateFormInfo('informalName', text)}  // Update state using context method
                placeholder="Informal Name"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                returnKeyType="done"
              />
            </View>

            {/* Street Address Input */}
            <View style={styles.inputWrapper}>
              <Icon name="map-marker" size={20} color="gray" style={styles.inputIcon} />
              <TextInput
                value={formData.formInfo.streetAddress}
                onChangeText={(text) => updateFormInfo('streetAddress', text)}  // Update state using context method
                placeholder="Street Address"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                returnKeyType="done"
              />
            </View>

            {/* City Input */}
            <View style={styles.inputWrapper}>
              <Icon name="building" size={20} color="gray" style={styles.inputIcon} />
              <TextInput
                value={formData.formInfo.city}
                onChangeText={(text) => updateFormInfo('city', text)}  // Update state using context method
                placeholder="City"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                returnKeyType="done"
              />
            </View>

            {/* State and Zipcode Row */}
            <View style={styles.rowContainer}>
              {/* State Input */}
              <View style={[styles.inputWrapper, styles.rowInput]}>
                <Icon name="caret-down" size={20} color="gray" style={styles.inputIcon} />
                <TextInput
                  value={formData.formInfo.state}
                  onChangeText={(text) => updateFormInfo('state', text)}  // Update state using context method
                  placeholder="State"
                  placeholderTextColor={'gray'}
                  style={styles.textInput}
                  returnKeyType="done"
                />
              </View>

              {/* Zipcode Input */}
              <View style={[styles.inputWrapper, styles.rowInput]}>
                <Icon name="map-pin" size={20} color="gray" style={styles.inputIcon} />
                <TextInput
                  value={formData.formInfo.zipcode}
                  onChangeText={(text) => updateFormInfo('zipcode', text)}  // Update state using context method
                  placeholder="Zipcode"
                  placeholderTextColor={'gray'}
                  style={styles.textInput}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={navigateToCreateAccount}>
            <Icon name="arrow-left" size={24} color="black" style={{ marginEnd: 20 }} />
          </TouchableOpacity>
          <Pressable style={styles.continueButton} onPress={navigateToVerification}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FormInfo;

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
    flex: 1,
    marginTop: 20,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 0.48,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF',
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
});