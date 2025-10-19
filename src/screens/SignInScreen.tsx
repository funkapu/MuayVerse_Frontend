import React from 'react';
import {
  Image as RNImage,
  ImageBackground as RNImageBackground,
  Text as RNText,
  TouchableOpacity as RNTouchableOpacity,
  View as RNView,
} from 'react-native';
import { styled } from 'nativewind';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Image = styled(RNImage);
const ImageBackground = styled(RNImageBackground);
const Text = styled(RNText);
const TouchableOpacity = styled(RNTouchableOpacity);
const View = styled(RNView);

// ⚙️ ตั้งค่า Google Sign-In (เปลี่ยน webClientId ของคุณเอง)
GoogleSignin.configure({
  webClientId:
    '815693339400-g8ri9762erus2tlli3qrvtailrtikdgg.apps.googleusercontent.com',
});

export default function SignInScreen({ navigation }: { navigation: any }) {
  const signInWithGoogle = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      // ✅ เก็บสถานะ login ไว้
      await AsyncStorage.setItem('isLoggedIn', 'true');

      // ✅ เด้งไปหน้า Home แล้วล้าง stack เดิม
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error: any) {
      console.error('Google Sign-In Error:', {
        code: error.code,
        message: error.message,
        raw: error,
      });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Backgroundmuay.jpg')}
      className="flex-1 justify-start items-center"
      resizeMode="cover"
    >
      <View className="w-full items-center justify-start mt-[12vh]">
        <Image
          source={require('../assets/logomuay.png')}
          className="w-4/5 h-24 mb-6"
          resizeMode="contain"
        />
        <Text className="text-white font-bold text-4xl mb-2 text-center">
          Welcome to
        </Text>
        <Text className="text-white font-bold text-lg mb-1 text-center">
          the ultimate world of Muay Thai
        </Text>
        <Text className="text-white font-bold text-lg text-center">
          mastery!
        </Text>
      </View>

      <TouchableOpacity
        onPress={signInWithGoogle}
        className="absolute bottom-16 w-11/12 items-center"
        activeOpacity={0.8}
      >
        <Image
          source={require('../assets/Signin.png')}
          className="w-full h-20 flex justify-center items-center mt-[-30vh]"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}
