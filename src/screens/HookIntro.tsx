import { View, Text, Button } from 'react-native';
import React, { useState, useCallback, useRef } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function Test({ navigation }) {
  return (
    <View className="flex-1 items-center bg-[#1A0000]">
      <Text className="text-yellow-200 flex-1 top-20 text-4xl font-extrabold ">
        หมัดฮุก
      </Text>
      <View className="flex-1 items-center justify-center bottom-7">
        <YoutubePlayer
          height={315}
          width={350}
          play={false}
          videoId="BFPsWWBd6s4"
          onError={e => console.log('Error:', e)}
          onChangeState={state => console.log('State:', state)}
        />
      </View>
      <View className="flex-1 shadow-2xl rounded-xl p-2 items-center w-11/12 bottom-20 h-64 bg-[#1A1A1A]">
        <Text className="text-white font-bold text-lg mb-1">
          ⭐ Tips and Tricks ⭐
        </Text>
        <Text className="text-white text-sm">
          {'\u2022'} ยืนในท่าพร้อม วางน้ำหนักเท่ากันทั้งสองขา{'\n'}
          {'\u2022'} บิดลำตัวและสะโพกไปด้านข้าง พร้อมหมุนเท้า{'\n'}
          {'\u2022'} งอศอก 90 องศา ให้หมัดโค้งระดับคางหรือซี่โครงคู่ต่อสู้{'\n'}
          {'\u2022'} หมุนส้นเท้าขาหน้าหรือหลัง เพื่อเพิ่มแรงเหวี่ยง{'\n'}
          {'\u2022'} ไม่กางศอกสูงเกินแนวไหล่ รักษารูปแบบที่มั่นคง{'\n'}
          {'\u2022'} หมัดอีกข้างยกขึ้นป้องกันใบหน้าเสมอ{'\n'}
          {'\u2022'} หลังออกหมัดให้รีบดึงแขนกลับ รักษาท่าทางเตรียมพร้อม
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
