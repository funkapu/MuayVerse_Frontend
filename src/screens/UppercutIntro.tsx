import { View, Text, Button } from 'react-native';
import React, { useState, useCallback, useRef } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function Test({ navigation }) {
  return (
    <View className="flex-1 items-center bg-[#1A0000]">
      <Text className="text-yellow-200 flex-1 top-20 text-4xl font-extrabold ">
        หมัดอัพเปอร์คัท
      </Text>
      <View className="flex-1 items-center justify-center bottom-7">
        <YoutubePlayer
          height={315}
          width={350}
          play={false}
          videoId="L5a9L--Jszw"
          onError={e => console.log('Error:', e)}
          onChangeState={state => console.log('State:', state)}
        />
      </View>
      <View className="flex-1 shadow-2xl rounded-xl p-2 items-center w-11/12 bottom-20 h-64 bg-[#1A1A1A]">
        <Text className="text-white font-bold text-lg mb-1">
          ⭐ Tips and Tricks ⭐
        </Text>
        <Text className="text-white text-sm">
          {'\u2022'} ย่อเข่าเล็กน้อย เตรียมตัวส่งแรงจากพื้น{'\n'}
          {'\u2022'} วางน้ำหนักตัวให้มั่นคงทั้งสองขา{'\n'}
          {'\u2022'} หมุนสะโพกและหัวไหล่เล็กน้อย ขณะปล่อยหมัดขึ้น{'\n'}
          {'\u2022'} งอศอกตั้งฉาก แล้วปล่อยหมัดในแนวโค้งขึ้นด้านหน้า{'\n'}
          {'\u2022'} ยกหมัดอีกข้างคอยป้องกันใบหน้าเสมอ{'\n'}
          {'\u2022'} อย่าเงยหน้าตามหมัด รักษาสายตาระดับเดิม{'\n'}
          {'\u2022'} หลังปล่อยหมัด ให้รีบดึงกลับ รักษาสมดุล
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
