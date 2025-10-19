import React from 'react';
import { styled } from 'nativewind';
import {
  ImageBackground as RNImageBackground,
  Text as RNText,
  View as RNView,
  TouchableOpacity as RNTouchableOpacity,
  Image as RNImage,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const ImageBackground = styled(RNImageBackground);
const Text = styled(RNText);
const View = styled(RNView);
const TouchableOpacity = styled(RNTouchableOpacity);
const Image = styled(RNImage);

function Profile({ navigation }) {
  const user = auth().currentUser;
  const displayName = user?.displayName; // ชื่อที่ผูกกับบัญชี Google
  const photoURL = user?.photoURL;
  return (
    <ImageBackground
      source={require('../assets/MuayverseBG_home.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 items-center justify-center px-5">
        <Image
          source={{ uri: photoURL }}
          className="w-20 h-20 rounded-full top-[-25vh]"
        />
        <Text className="text-3xl font-bold text-white  mb-4 top-[-43vh]">
          {displayName}
        </Text>

        {/* กล่องโปร่งใส */}
        <View className="absolute top-60 left-0 right-0 h-[450px] bg-[#262525] opacity-90 rounded-2xl flex-col items-start px-8 py-8">
          {/* Started */}
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-4 text-red-600">📅</Text>
            <View>
              <Text className="text-white font-bold text-lg">Started</Text>
              <Text className="text-red-500 text-base mt-1">Apr 10, 2025</Text>
            </View>
          </View>
          {/* Training time */}
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-4 text-red-600">🕒</Text>
            <View>
              <Text className="text-white font-bold text-lg">
                Training time
              </Text>
              <Text className="text-red-500 text-base mt-1">10 hr</Text>
            </View>
          </View>
          {/* Lastest mode */}
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-4 text-red-600">📍</Text>
            <View>
              <Text className="text-white font-bold text-lg">Lastest mode</Text>
              <Text className="text-red-500 text-base mt-1">
                Punch - หมัดตรงหน้า
              </Text>
            </View>
          </View>
          {/* Level */}
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-4 text-red-600">📊</Text>
            <View>
              <Text className="text-white font-bold text-lg">Level</Text>
              <Text className="text-red-500 text-base mt-1">1</Text>
            </View>
          </View>
          {/* History */}
          <View className="flex-row items-center">
            <Text className="text-2xl mr-4 text-red-600">🪪</Text>
            <View>
              <Text className="text-white font-bold text-lg">History</Text>
              <Text className="text-red-500 text-base mt-1">RookieFighter</Text>
            </View>
          </View>
        </View>

        {/* Rectangle ด้านล่าง + ปุ่มโลโก้ */}
        <View className="absolute left-0 right-0 bottom-7 h-24 bg-[#452222] border-2 border-red-600 rounded-t-lg flex-row items-center justify-around px-8">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/Home.png')}
              className="w-16 h-12 -rotate-90"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Mainstage')}>
            <Image
              source={require('../assets/Stage.png')}
              className="w-16 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../assets/profile.png')}
              className="w-16 h-12 -rotate-90"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* ปุ่ม Logout */}
        <TouchableOpacity
          className="absolute left-0 right-0 bottom-0 bg-red-600 py-4 items-center rounded-b-2xl bottom-[120px]"
          onPress={async () => {
            try {
              await auth().signOut();
              navigation.replace('Login'); // หรือ navigation.navigate('Login')
            } catch (e) {
              console.warn('Logout error:', e);
            }
          }}
        >
          <Text className="text-white text-lg font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default Profile;
