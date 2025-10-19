import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

function Mainstage({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/MuayverseBG_home.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 items-center justify-center px-3">

        {/* Rectangle ด้านล่าง */}
        
        <View className="absolute left-0 right-0 bottom-8 h-24 bg-[#452222] border-2 border-red-600 rounded-t-lg flex-row items-center justify-around px-8">
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
        <Text className="text-2xl font-bold text-white mt-5 mb-2">Kru Muaythai AI</Text>
        {/* ปุ่ม Punch */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Punchstage')}
          className="mt-8"
        >
          <Image
            source={require('../assets/sparringstage.png')}
            className="w-80 h-52"
            resizeMode="contain"
          />
        </TouchableOpacity>
      
        {/* ปุ่ม Sparring */}
        <Text className="text-2xl font-bold text-white mb-8 flex justify-center top-12">Sparring Mode </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Sparring')}
          className="mt-4"
        >
          <Image
            source={require('../assets/Pstage.png')}
            className="w-56 h-32"
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* แถบแดง (แนวตั้ง) */}
      </View>
    </ImageBackground>
  );
}

export default Mainstage;
