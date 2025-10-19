import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PunchstageScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require('../assets/MuayverseBG_home.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 items-center justify-center pt-[60px] pb-[100px]">
        
        {/* Title */}
        <Text className="absolute top-12 text-center text-4xl text-white font-bold text-shadow z-50">
          Punch
        </Text>

        {/* ปุ่มหมัดแนวตั้ง พร้อม custom ขนาด */}
        <View className="flex-col items-center justify-center w-[85%] mt-8 mb-5 space-y-[10px]">
          {[
            { name: 'Jab', img: require('../assets/jab.png'), screen: 'JabDetailScreen', w: 0.5, h: 0.28 },
            { name: 'Cross', img: require('../assets/Cross.png'), screen: 'CrossIntro', w: 0.4, h: 0.22 },
            { name: 'Hook', img: require('../assets/Hook.png'), screen: 'HookIntro', w: 0.35, h: 0.2 },
            { name: 'Uppercut', img: require('../assets/uppercut.png'), screen: 'UppercutIntro', w: 0.55, h: 0.3 },
          ].map(({ name, img, screen, w, h }) => (
            <TouchableOpacity
              key={name}
              onPress={() =>
                navigation.navigate(screen, { poseType: name })
              }
              className="items-center justify-center w-full my-2"
              activeOpacity={0.8}
            >
              <Image
                source={img}
                style={{ width: width * w, height: width * h }}
                resizeMode="contain"
              />
              <Text className="mt-2 text-xl font-bold text-white text-center text-shadow">
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Navigation */}
        <View className="absolute left-0 right-0 bottom-8 h-[90px] bg-[#452222] border-t-2 border-red-600 rounded-t-xl flex-row items-center justify-around px-8 z-50">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/Home.png')}
              className="w-[55px] h-[45px] -rotate-90"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Mainstage')}>
            <Image
              source={require('../assets/Stage.png')}
              className="w-[55px] h-[45px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../assets/profile.png')}
              className="w-[55px] h-[45px] -rotate-90"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
