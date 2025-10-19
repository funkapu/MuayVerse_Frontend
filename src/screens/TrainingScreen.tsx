import React, { useEffect, useRef, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { MuayPoseView } from '../components/MuayPoseView';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import 'nativewind';

const eventEmitter = new NativeEventEmitter(
  NativeModules.DeviceEventManagerModule,
);

export default function TrainingScreen() {
  const route = useRoute();
  const { poseType } = route.params as { poseType: string };

  const navigation = useNavigation();
  const ws = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSent = useRef(Date.now());

  const [similarity, setSimilarity] = useState(0);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [timer, setTimer] = useState(30);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState(''); // ✅ Feedback State
  const scoreRef = useRef(0);
  const punchCountRef = useRef(0);
  const simSumRef = useRef(0);

  const playCheerSound = () => {
    try {
      SoundPlayer.playSoundFile('correct', 'mp3');
    } catch (e) {
      console.warn('❌ playCheerSound error:', e);
    }
  };

  const playStartSound = () => {
    try {
      SoundPlayer.playSoundFile('start', 'mp3');
    } catch (e) {
      console.warn('❌ playStartSound error:', e);
    }
  };
  const stopBackgroundLoop = () => {
    try {
      SoundPlayer.stop();
    } catch (e) {
      console.warn('❌ stopBackgroundLoop error:', e);
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    scoreRef.current = 0;
    punchCountRef.current = 0;
    simSumRef.current = 0;

    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          stopBackgroundLoop();

          const avg =
            punchCountRef.current === 0
              ? 0
              : simSumRef.current / punchCountRef.current;

          navigation.navigate('Summary', {
            score: scoreRef.current,
            totalPunches: punchCountRef.current,
            averageSimilarity: avg,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startCountdown = () => {
    setCountdown(3);
    playStartSound();
    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(countdownInterval);
        setCountdown(null);
        startTraining();
      }
    }, 1000);
  };

  const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket('ws://10.70.77.220:8000/ws');

    ws.current.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.current.onclose = () => {
      console.log('🔌 WebSocket disconnected');
    };

    ws.current.onmessage = msg => {
      const data = JSON.parse(msg.data);
      setSimilarity(data.similarity);
      setFeedbackText(data.feedback); // ✅ เก็บ feedback
      scoreRef.current = data.score;

      if (data.feedback === 'good') {
        playCheerSound();
        setShowSuccessOverlay(true);
        setTimeout(() => setShowSuccessOverlay(false), 300);
        punchCountRef.current += 1;
        simSumRef.current += data.similarity;
      }
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      ws.current?.close();
      SoundPlayer.stop();
      clearInterval(intervalRef.current!);
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    }
  }, []);

  useEffect(() => {
    const sub = eventEmitter.addListener('onPoseKeypoints', event => {
      if (!isTraining) return;

      const now = Date.now();
      if (now - lastSent.current < 100) return;
      lastSent.current = now;

      const keypoints = event.keypoints || [];
      const flat = keypoints.flatMap((pt: any) => [pt.x, pt.y, pt.z ?? 0]);

      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            keypoints: flat,
            poseType: poseType,
          }),
        );
      }
    });

    return () => sub.remove();
  }, [isTraining, poseType]);

  const renderFeedback = (feedback: string) => {
    switch (feedback) {
      case 'good':
        return 'ดีมาก!';
      case 'slow':
        return 'เร็วขึ้นอีกหน่อย!';
      case 'elbow_up':
        return 'ยกศอกขึ้น!';
      case 'elbow_down':
        return 'ศอกต่ำไป!';
      case 'unsupported_pose':
        return 'ยังไม่รองรับท่านี้';
      default:
        return '';
    }
  };

  return (
    <View className="flex-1">
      <MuayPoseView style={{ flex: 1, width: '100%', height: '100%' }} />
      {showSuccessOverlay && (
        <View className="absolute inset-0 bg-green-400/30 z-50 w-full h-full" />
      )}

      {countdown !== null ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500 text-7xl font-bold text-center">
            {countdown}
          </Text>
        </View>
      ) : !isTraining ? (
        <View className="flex-1 items-center justify-center">
          <Pressable
            className="bg-red-500 px-10 py-4 rounded-xl"
            onPress={startCountdown}
          >
            <Text className="text-white text-2xl font-bold">เริ่มฝึก!</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View className="absolute top-10 self-center w-full bg-gray-800/60 rounded-xl px-4 py-2">
            <Text className="text-white text-4xl">⏱️ {timer}s</Text>
            <View className="absolute right-5 top-0">
              <Text className="text-white text-4xl font-extrabold text-right">
                Score : {punchCountRef.current}
              </Text>
            </View>
          </View>

          {/* ✅ แสดง Feedback ด้านล่าง */}
          <View className="absolute bottom-10 w-full items-center">
            <Text className="text-2xl font-bold text-white bg-black/60 px-6 py-2 rounded-xl">
              🧠 {renderFeedback(feedbackText)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
