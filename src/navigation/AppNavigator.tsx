import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from '../screens/SignInScreen'
import HomeScreen from '../screens/HomeScreen'
import Mainstage from '../screens/Mainstage'
import Punchstage from '../screens/punchstage'
import TrainingScreen from '../screens/TrainingScreen'
import SummaryScreen from '../screens/SummaryScreen'
import ProfileScreen from '../screens/Profile'
import JabDetailScreen  from '../screens/JabDetailScreen'
import CrossIntro from '../screens/CrossIntro'
import HookIntro from '../screens/HookIntro'
import UppercutIntro from '../screens/UppercutIntro'
const Stack = createNativeStackNavigator()

export default function AppNavigator() {  
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // ✅ เช็กสถานะการ login ผ่าน Firebase auth
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        // ✅ มีผู้ใช้ login อยู่
        await AsyncStorage.setItem('isLoggedIn', 'true')
        setIsLoggedIn(true)
      } else {
        await AsyncStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false)
      }
      setIsLoading(false)
    })

    return unsubscribe // cleanup
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Mainstage" component={Mainstage} />
          <Stack.Screen name="Punchstage" component={Punchstage} />
          <Stack.Screen name="JabDetailScreen" component={JabDetailScreen} />
          <Stack.Screen name="CrossIntro" component={CrossIntro} />
          <Stack.Screen name="HookIntro" component={HookIntro} />
          <Stack.Screen name="UppercutIntro" component={UppercutIntro} />
          <Stack.Screen name="Training" component={TrainingScreen} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )}
    </Stack.Navigator>
  )
}
