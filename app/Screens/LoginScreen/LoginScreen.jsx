import { useOAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../components/Utills/Colors';
import { useWarmUpBrowser } from '../../../hooks/WarmUpBrowser';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession(); 

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' , });
  const navigation = useNavigation();

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        navigation.reset({
           index: 0,
           routes: [{ name: 'HomeScreen/HomeScreen' }],
        });

        
      } else {
        console.log('No session created');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo-black.png')}
        style={styles.logoImage}
      />
      <Image
        source={require('../../../assets/images/image3.png')}
        style={styles.bgImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          Less stress. More success
        </Text>
        <Text style={styles.desc}>
          GetItDone helps you own your day and feel amazing doing it!
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>
          Let's Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 500,
    height: 250,
    resizeMode: 'contain',
    marginBottom: -60,
    marginTop:-100
  },
  textContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 25,
    fontFamily: 'Outfit-bold',
    textAlign: 'center',
    marginTop: 20,
  },
  desc: {
    fontSize: 17,
    fontFamily: 'Outfit',
    marginTop: 15,
    textAlign: 'center',
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontSize: 17,
    paddingHorizontal: 30,
  },
  bgImage: {
    width: '100%',
    height: 300,
    marginTop: 10,
    resizeMode: 'cover',
  },
});
