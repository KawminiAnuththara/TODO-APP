import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // You can customize post-login navigation here
    router.replace('/'); // or '/HomeScreen' if that's your main page
  }, []);

  return null;
}
