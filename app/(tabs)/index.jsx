import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function Index() {
  
    // Prevent splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();
  


  const [fontsLoaded] = useFonts({
    "Outfit": require("../../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-medium": require("../../assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-bold": require("../../assets/fonts/Outfit-Bold.ttf"),
    
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

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }


  return (
    
      <View style={styles.container} onLayout ={onLayoutRootView}>
      <Text style={{
        fontSize:20,
        fontFamily:'Outfit'
      }}>Hello World</Text>
    </View>
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
