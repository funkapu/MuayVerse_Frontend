import { View, Text, Button } from 'react-native';
import React, { useState, useCallback, useRef } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function Test({ navigation }) {
  return (
    <View className="flex-1 items-center bg-[#1A0000]">
      <Text className="text-yellow-200 flex-1 top-20 text-4xl font-extrabold ">
        หมัดแย็ป 
      </Text>
      <View className="flex-1 items-center justify-center bottom-7">
        <YoutubePlayer
          height={315}
          width={350}
          play={false}
          videoId="zkoVmAJW02s"
          onError={e => console.log('Error:', e)}
          onChangeState={state => console.log('State:', state)}
        />
      </View>
      <View className="flex-1 shadow-2xl rounded-xl p-2 items-center w-11/12 bottom-20 h-64 bg-[#1A1A1A]">
        <Text className="text-white font-bold text-lg mb-1">
          ⭐ Tips and Tricks ⭐
        </Text>
        <Text className="text-white text-sm">
          {'\u2022'} วางน้ำหนักไว้ขาหลัง เพื่อความมั่นคง{'\n'}
          {'\u2022'} หมุนสะโพกเล็กน้อย เพิ่มแรงหมัด{'\n'}
          {'\u2022'} ยืดแขนตรง และสแน็ปกลับทันที{'\n'}
          {'\u2022'} ยกไหล่ขึ้นบังคางตอนออกหมัด{'\n'}
          {'\u2022'} ศอกชิดลำตัว อย่าแอ่นศอกออก{'\n'}
          {'\u2022'} อย่าเอนไปหน้า รักษาสมดุล{'\n'}
          {'\u2022'} ออกหมัดพร้อมก้าวเท้าเล็กน้อย
        </Text>
        {/* ปุ่มย้อนกลับ */}
        <View className="mt-4 w-full flex-row justify-between px-12 py-9">
          <Button
            title="ย้อนกลับ"
            color="#ef4444"
            onPress={() => navigation && navigation.goBack()}
          />
          <Button
            title='เริ่มฝึก' 
            color="#FFD700"
            onPress={() => navigation && navigation.navigate('Training', { posetype: 'jab' })}
          />
        </View>
      </View>
    </View>
  );
}
