import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Custom Dot Component with Animation
const CustomDots = ({ pages, currentIndex }) => {
  const animatedValues = useRef(pages.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    animatedValues.forEach((value, index) => {
      Animated.timing(value, {
        toValue: currentIndex === index ? 1.2 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [currentIndex]);

  return (
    <View style={styles.dotsContainer}>
      {pages.map((_, index) => {
        const scale = animatedValues[index];
        const backgroundColor = currentIndex === index ? '#333' : '#c4c4c4';

        return (
          <Animated.View
            key={index}
            style={[styles.dot, { backgroundColor, transform: [{ scale }] }]}
          />
        );
      })}
    </View>
  );
};

export default function Index() {
  const navigation = useNavigation(); // Initialize the navigation object

  const navigateToLogin = () => {
    navigation.navigate('loginscreen/login'); // Navigate to login screen
  };

  const navigateToCreateAccount = () => {
    navigation.navigate('signupscreen/create_account'); // Navigate to login screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding
        showSkip={false}
        showNext={false}
        showPagination={false}
        showDone={false}
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: '#D5715B',
            image: (
              <Image
                source={require('../assets/images/welcome.png')}
                style={styles.image}
              />
            ),
            title: (
              <View style={styles.textContainer}>
                <Text style={styles.title}>Quality</Text>
                <Text style={styles.subtitle}>
                  Sell your farm fresh products directly to consumers, cutting out the middleman and reducing emissions of the global supply chain.
                </Text>
                <CustomDots pages={[1, 2, 3]} currentIndex={0} />
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={[styles.signupButton, { backgroundColor: '#D5715B' }]} onPress={navigateToCreateAccount}>
                    <Text style={[styles.signUpButtonText, { color: '#fff' }]}>Join the movement</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
                    <Text style={styles.LoginButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
            subtitle: (
              <View style={{ backgroundColor: '#fff' }} />
            ),
          },
          {
            backgroundColor: '#5EA25F',
            image: (
              <Image
                source={require('../assets/images/welcome.png')}
                style={styles.image}
              />
            ),
            title: (
              <View style={styles.textContainer}>
                <Text style={styles.title}>Convenient</Text>
                <Text style={styles.subtitle}>
                  Our team of delivery drivers will make sure your orders are picked up on time and promptly delivered to your customers.
                </Text>
                <CustomDots pages={[1, 2, 3]} currentIndex={1} />
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={[styles.signupButton, { backgroundColor: '#5EA25F' }]} onPress={navigateToCreateAccount}>
                    <Text style={[styles.signUpButtonText, { color: '#fff' }]}>Join the movement</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
                    <Text style={styles.LoginButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
            subtitle: (
              <View style={{ backgroundColor: '#fff' }} />
            ),
          },
          {
            backgroundColor: '#FFFF00',
            image: (
              <Image
                source={require('../assets/images/welcome.png')}
                style={styles.image}
              />
            ),
            title: (
              <View style={styles.textContainer}>
                <Text style={styles.title}>Local</Text>
                <Text style={styles.subtitle}>
                  We love the earth and know you do too! Join us in reducing our local carbon footprint one order at a time.
                </Text>
                <CustomDots pages={[1, 2, 3]} currentIndex={2} />
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={[styles.signupButton, { backgroundColor: '#FFFF00' }]} onPress={navigateToCreateAccount}>
                    <Text style={styles.signUpButtonText}>Join the movement</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
                    <Text style={styles.LoginButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
            subtitle: (
              <View style={{ backgroundColor: '#fff' }} />
            ),
          }
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  onboardingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    height: 300,
    width: 450,
    resizeMode: 'contain'
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent:'space-evenly',
    width:'100%'
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16
  },
  subtitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
    marginBottom: 20
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  signupButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginBottom: 10,
  },
  signUpButtonText: {
    fontWeight: '600',
    fontSize: 18,
  },
  LoginButtonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 20,
  },
});
