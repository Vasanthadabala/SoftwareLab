import React from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { AppProvider } from './apiservice/appcontext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'mono': require('./../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="loginscreen/login" options={{ headerShown: false }} />
        <Stack.Screen name="loginscreen/forgot" options={{ headerShown: false }} />
        <Stack.Screen name="loginscreen/verifyotp" options={{ headerShown: false }} />
        <Stack.Screen name="loginscreen/resetpassword" options={{ headerShown: false }} />
        <Stack.Screen name="signupscreen/create_account" options={{ headerShown: false }} />
        <Stack.Screen name="signupscreen/forminfo" options={{ headerShown: false }} />
        <Stack.Screen name="signupscreen/verification" options={{ headerShown: false }} />
        <Stack.Screen name="signupscreen/businesshours" options={{ headerShown: false }} />
        <Stack.Screen name="signupscreen/success" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}
