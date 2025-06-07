import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
// import TabNavigation from './navigation/TabNavigation'; ← Uncomment this if needed
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import Colors from '@/components/Utills/Colors';
import MainNavigator from '@/components/Navigations/MainNavigation';
import Toast from 'react-native-toast-message';
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [fontsLoaded] = useFonts({
    Outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-medium': require('../assets/fonts/Outfit-SemiBold.ttf'),
    'Outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    
      <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_Z3VpZGluZy1tb2xseS0zMi5jbGVyay5hY2NvdW50cy5kZXYk"

    >
      
      <View onLayout={onLayoutRootView} style={styles.container}>
        <SignedIn>
          
            <MainNavigator/>
          
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
        <Toast/>

        <StatusBar style="auto" />
      </View>
      
    </ClerkProvider>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
    
  },
});
