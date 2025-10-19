import { requireNativeComponent, NativeModules, Platform, ViewStyle, UIManager, findNodeHandle, NativeEventEmitter } from 'react-native'
import React, { useRef, useEffect } from 'react'

const LINKING_ERROR =
  `The package 'muayposeview' doesn't seem to be linked properly.`

const ComponentName = 'MuayPoseView'

const MuayPoseViewNative = requireNativeComponent(ComponentName)

export function MuayPoseView({ style }: { style: ViewStyle }) {
  const ref = useRef(null)

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules[ComponentName])
    const sub = eventEmitter.addListener('poseKeypoints', (event) => {
      // ✅ ส่ง event ต่อไปให้ React Native ฝั่ง JS ฟังได้
      const jsEmitter = new NativeEventEmitter(NativeModules.DeviceEventManagerModule)
      jsEmitter.emit('onPoseKeypoints', event)
    })

    return () => sub.remove()
  }, [])

  return <MuayPoseViewNative ref={ref} style={style} />
}
