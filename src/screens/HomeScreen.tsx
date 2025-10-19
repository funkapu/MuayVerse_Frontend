// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import { WebView } from 'react-native-webview'

interface HomeScreenProps {
  navigation: any
}

function HomeScreen({ navigation }: HomeScreenProps) {
  const [dayCount, setDayCount] = useState<number>(1)
  const user = auth().currentUser

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const firstDate = await AsyncStorage.getItem('firstLaunchDate')
        const today = new Date()
        if (!firstDate) {
          await AsyncStorage.setItem('firstLaunchDate', today.toISOString())
          setDayCount(1)
        } else {
          const first = new Date(firstDate)
          const diffTime = today.getTime() - first.getTime()
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
          setDayCount(diffDays)
        }
      } catch (e) {
        setDayCount(1)
      }
    }

    checkFirstLaunch()
  }, [])

  return (
    <ImageBackground
      source={require('../assets/MuayverseBG_home.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 items-center justify-center px-5">
        {/* streak */}
        <View className="flex-1 items-center justify-center px-5">
          <View className="flex-row items-end mb-2">
            <Text className="text-4xl text-white font-black">{dayCount}</Text>
            <Text className="text-4xl text-white font-black ml-2">
              day streak
            </Text>
          </View>
        </View>

        {/* spark */}
        <Text className="text-4xl text-yellow-400 font-black mb-2">
          (The spark)
        </Text>

        {/* 🔥 WebView Fire */}
        <View style={{ width: 520, height: 240, marginBottom: 12 }}>
          <WebView
            source={{ uri: 'file:///android_asset/fire.html' }}
            style={{ backgroundColor: 'transparent' }}
            originWhitelist={['*']}
            scrollEnabled={false}
          />
        </View>

        {/* Bottom bar */}
        <View className="absolute left-0 right-0 bottom-0 h-[15vh] bg-[#452222] border-2 border-red-600 rounded-t-lg" />

        {/* Start training */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Mainstage')}
          className="mt-12 bottom-16"
        >
          <Image
            source={require('../assets/StartTraining.png')}
            className="w-80 h-44"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Nav buttons */}
        <View className="flex-row mt-8 space-x-8 bottom-14">
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
      </View>
    </ImageBackground>
  )
}

export default HomeScreen
