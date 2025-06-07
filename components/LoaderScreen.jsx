import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import Colors from "./Utills/Colors";

export default function LoaderScreen() {
   const animation = useRef(null);
   const router = useRouter(null);

  useEffect(() => {
    // Simulate a loading period before navigating to the LoginScreen
    setTimeout(() => {
      router.replace("/Screens/LoginScreen/LoginScreen");
    }, 3000); // Adjust the time as needed
  }, []);
  return (
    <View style={styles.animationContainer}>
      <ImageBackground 
        style={styles.bgImage}
        source={require('../assets/images/bgImage.png')}
        blurRadius={5} // Apply blur effect
      >
        <View style={styles.centerContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo-white.png')}
          />
          <LottieView
            autoPlay
            ref={animation}
            style={styles.loader}
            source={require('../assets/images/loader.json')}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
  bgImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 150,
    marginBottom: 20,
  },
  loader: {
    width: 200,
    height: 200,
  },
});
