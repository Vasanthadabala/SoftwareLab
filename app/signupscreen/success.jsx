import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AppContext } from '../apiservice/appcontext';

const BusinessHours = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
  const timeSlots = ['9AM - 11AM', '11AM - 1PM', '1PM - 3PM', '3PM - 5PM'];

  const toggleSelection = (item, type) => {
    setFormData((prevData) => {
      const selectedItems = prevData.businessHours[type].includes(item)
        ? prevData.businessHours[type].filter((i) => i !== item)
        : [...prevData.businessHours[type], item];
      return {
        ...prevData,
        businessHours: {
          ...prevData.businessHours,
          [type]: selectedItems
        }
      };
    });
  };

  const validateFormData = () => {
    // Validate user information
    if (
      !formData.user.username ||
      !formData.user.email ||
      !formData.user.phone ||
      !formData.user.password ||
      !formData.user.confirmPassword
    ) {
      Alert.alert('Missing User Information', 'Please fill out all required user fields.');
      return false;
    }

    // Validate business information
    if (
      !formData.businessInfo.businessName ||
      !formData.businessInfo.streetAddress ||
      !formData.businessInfo.city ||
      !formData.businessInfo.state ||
      !formData.businessInfo.zipcode
    ) {
      Alert.alert('Missing Business Information', 'Please fill out all required business info fields.');
      return false;
    }

    // Validate business hours
    if (
      formData.businessHours.selectedDays.length === 0 || 
      formData.businessHours.selectedTimeSlots.length === 0
    ) {
      Alert.alert('Selection Error', 'Please select at least one day and one time slot.');
      return false;
    }

    return true;
  };

  const submitSignupData = async () => {
    if (!validateFormData()) return;

    setLoading(true);
    try {
      const response = await axios.post('YOUR_API_ENDPOINT_URL', formData);
      if (response.data.success) {
        navigation.navigate('signupscreen/success');
      } else {
        Alert.alert('Error', 'Failed to create an account. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating an account.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.secondHeaderText}>Signup 4 of 4</Text>
      <Text style={styles.headerText}>Business Hours</Text>
      <Text style={styles.instructionText}>
        Choose the hours your farm is open for pickups. This will allow customers to order deliveries.
      </Text>

      {/* Day Selection */}
      <View style={styles.selectionContainer}>
        {daysOfWeek.map((day, index) => (
          <Pressable
            key={index}
            style={[
              styles.button,
              formData.businessHours.selectedDays.includes(day) && styles.selectedButton,
            ]}
            onPress={() => toggleSelection(day, 'selectedDays')}
          >
            <Text
              style={[
                styles.buttonText,
                formData.businessHours.selectedDays.includes(day) && styles.selectedButtonText,
              ]}
            >
              {day}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Time Slot Selection */}
      <View style={styles.selectionContainer}>
        {timeSlots.map((slot, index) => (
          <Pressable
            key={index}
            style={[
              styles.button,
              formData.businessHours.selectedTimeSlots.includes(slot) && styles.selectedButton,
            ]}
            onPress={() => toggleSelection(slot, 'selectedTimeSlots')}
          >
            <Text
              style={[
                styles.buttonText,
                formData.businessHours.selectedTimeSlots.includes(slot) && styles.selectedButtonText,
              ]}
            >
              {slot}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => navigation.navigate('signupscreen/verification')}>
          <Icon name="arrow-left" size={24} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Pressable style={styles.continueButton} onPress={submitSignupData} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.continueButtonText}>Submit</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default BusinessHours;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  headerText: {
    marginTop: 10,
    marginStart: 20,
    fontSize: 34,
    fontWeight: '700',
  },
  secondHeaderText: {
    fontSize: 16,
    marginTop: 20,
    marginStart: 20,
    fontWeight: '400',
    color: 'gray',
  },
  instructionText: {
    fontSize: 16,
    marginTop: 10,
    marginStart: 20,
    marginEnd: 20,
    color: 'gray',
    fontWeight: '400',
  },
  selectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 40,
  },
  button: {
    backgroundColor: '#ededed',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '48%', // Two buttons per row
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  selectedButton: {
    backgroundColor: '#D5715B',
  },
  selectedButtonText: {
    color: '#FFF',
  },
  bottomRow: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
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
  backIcon: {
    marginEnd: 20,
  },
});
