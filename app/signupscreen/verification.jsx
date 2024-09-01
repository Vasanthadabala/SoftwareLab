import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../apiservice/appcontext';

const Verification = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(AppContext); // Use Context to manage state

  const navigateToFormInfo = () => {
    navigation.navigate('signupscreen/forminfo');
  };

  const navigateToBusinessHours = () => {
    // Ensure `isFileAttached` is true before navigating
    if (formData.verification.isFileAttached) {
      navigation.navigate('signupscreen/businesshours');
    } else {
      Alert.alert('File Attachment Required', 'Please attach a file before continuing.');
    }
  };

  const handleFileAttachment = () => {
    // Logic for file attachment could be implemented here in the future
    Alert.alert('File Attachment', 'File attached successfully!');

    // Update the global state to reflect that a file has been attached
    setFormData(prevData => ({
      ...prevData,
      verification: { ...prevData.verification, isFileAttached: true }
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.secondHeaderText}>Signup 3 of 4</Text>
      <Text style={styles.headerText}>Verification</Text>
      <Text style={styles.instructionText}>
        Attach proof of Department of Agriculture registrations, e.g., Florida Fresh,
        USDA Approved, USDA Organic.
      </Text>

      <View style={styles.fileInputContainer}>
        <Pressable style={styles.fileButton} onPress={handleFileAttachment}>
          <Icon name="file-pdf-o" size={20} color="gray" style={styles.inputIcon} />
          <Text style={styles.fileButtonText}>Attach PDF File</Text>
        </Pressable>
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={navigateToFormInfo}>
          <Icon name="arrow-left" size={24} color="black" style={{ marginEnd: 20 }} />
        </TouchableOpacity>
        <Pressable style={styles.continueButton} onPress={navigateToBusinessHours}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

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
  fileInputContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  inputIcon: {
    marginRight: 8,
    color: 'black',
  },
  fileButtonText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  bottomRow: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
