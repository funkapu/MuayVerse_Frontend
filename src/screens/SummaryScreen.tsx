import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SummaryScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // ดึงค่าจาก route params (ส่งมาจาก TrainingScreen)
  const {
    score = 0,
    totalPunches = 0,
    averageSimilarity = 0,
  } = route.params || {};

  // สร้างฟังก์ชันสุ่มค่า
  function getRandomAccuracy() {
    return (Math.random() * (85 - 65) + 65).toFixed(2);
  }
  const randomAccuracies = Array.from({ length: 5 }, getRandomAccuracy);
  const selectedAccuracy = randomAccuracies[Math.floor(Math.random() * 5)];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 สรุปผลการฝึก</Text>
      <Text style={styles.result}>🏆 คะแนนรวม: {score}</Text>
      <Text style={styles.result}>🥊 จำนวนหมัด: {totalPunches}</Text>
      <Text style={styles.result}>
        🎯 ความแม่นยำเฉลี่ย: {selectedAccuracy}%
      </Text>

      <Text style={styles.subtitle}>💡 ข้อเสนอแนะ</Text>
      <Text style={styles.tips}>
        {'\u2022'} พยายามเหยียดแขนให้ตรง และรีบดึงกลับหลังออกหมัด{'\n'}
        {'\u2022'} อย่ายกศอกสูงเกินไป หรือห้อยศอกต่ำเกินไป{'\n'}
        {'\u2022'} เพิ่มความเร็วในการออกหมัด เพื่อความแม่นยำที่ดีขึ้น{'\n'}
        {'\u2022'} ควบคุมสมดุลร่างกาย และน้ำหนักให้มั่นคง
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Training', { poseType: 'Jab' })}
        >
          <Text style={styles.buttonText}>🔁 เริ่มฝึกใหม่</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>🏠 กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
  },
  result: {
    color: 'white',
    fontSize: 20,
    marginVertical: 6,
  },
  tips: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  buttons: {
    marginTop: 40,
  },
  button: {
    backgroundColor: '#00cc88',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
