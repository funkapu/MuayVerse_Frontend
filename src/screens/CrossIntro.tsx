import { View, Text, Button } from 'react-native';
import React, { useState, useCallback, useRef } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function Test({ navigation }) {
  return (
    <View className="flex-1 items-center bg-[#1A0000]">
      <Text className="text-yellow-200 flex-1 top-20 text-4xl font-extrabold ">
        หมัดตรง
      </Text>
      <View className="flex-1 items-center justify-center bottom-7">
        <YoutubePlayer
          height={315}
          width={350}
          play={false}
          videoId="oGUJHe8DbH0"
          onError={e => console.log('Error:', e)}
          onChangeState={state => console.log('State:', state)}
        />
      </View>
      <View className="flex-1 shadow-2xl rounded-xl p-2 items-center w-11/12 bottom-20 h-64 bg-[#1A1A1A]">
        <Text className="text-white font-bold text-lg mb-1">
          ⭐ Tips and Tricks ⭐
        </Text>
        <Text className="text-white text-sm">
          {'\u2022'} วางน้ำหนักตัวตรงกลาง หรือเน้นที่ขาหน้าเล็กน้อย{'\n'}
          {'\u2022'} หมุนสะโพกและลำตัวพร้อมกัน เพิ่มแรงส่งหมัด{'\n'}
          {'\u2022'} เหยียดแขนหลังตรง และสแน็ปกลับเร็ว{'\n'}
          {'\u2022'} ศอกอยู่ในแนวเดียวกับหมัด ไม่กางศอก{'\n'}
          {'\u2022'} ยกส้นเท้าหลังเล็กน้อย เพิ่มการหมุนตัว{'\n'}
          {'\u2022'} มือหน้าใช้ป้องกันใบหน้าไว้เสมอ{'\n'}
          {'\u2022'} อย่าหลุดสมดุลหลังออกหมัด รักษาท่าทางมั่นคง
        </Text>
        {/* ปุ่มย้อนกลับ */}
        <View className="mt-4 w-full flex-row justify-between px-12 py-9">
          <Button
            title="ย้อนกลับ"
            color="#ef4444"
            onPress={() => navigation && navigation.goBack()}
          />
          <Button
            title="เริ่มฝึก"
            color="#FFD700"
            onPress={() =>
              navigation && navigation.navigate('Training', { posetype: 'jab' })
            }
          />
        </View>
      </View>
    </View>
  );
}
