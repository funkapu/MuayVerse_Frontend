import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Linking } from 'react-native';

function CrossScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/Muayverse (1).jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={[styles.title, styles.textStroke]}>Punch</Text>
        <Text style={[styles.subtitle, styles.textStroke]}>Hook</Text>
        
        {/* รูปสี่เหลี่ยมผืนผ้าที่มีขอบ */}
        <View style={styles.borderedRectangle} />
        
        {/* เปลี่ยนจาก Button เป็น TouchableOpacity ที่มีรูปภาพ */}
        {/* ปุ่ม Start Training */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Mainstage')}
          style={styles.imageButton}
        >
          <Image
            source={require('../assets/StartTraining.png')}
            style={styles.buttonImage}   // ใช้ style นี้สำหรับ StartTraining.png
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* ปุ่ม Stage */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Mainstage')}
          style={styles.Stagebotton}
        >
          <Image
            source={require('../assets/Stage.png')}
            style={styles.stageImage}    // ใช้ style ใหม่สำหรับ Stage.png
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* ปุ่ม Home */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.Homebotton}
        >
          <Image
            source={require('../assets/Home.png')}
            style={styles.homeImage}   
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* ปุ่ม profile */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.Profilebotton}
        >
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileImage}   
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* สี่เหลี่ยมโปร่งใส */}
        <View
          style={{
            width: 440,           // ความกว้าง
            height: 500,          // ความสูง
            backgroundColor: 'rgba(0, 0, 0, 0.4)', 
            borderRadius: 20,     // มุมโค้ง
            position: 'absolute', // ถ้าต้องการวางทับ
            top: 180,             // ปรับตำแหน่งตามต้องการ
            left: -5,
          }}
        />

        <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/BFPsWWBd6s4?si=NZXrjg1AYpZ-1lQd')}>
          <Image
            source={require('../assets/cliphook.jpg')}
            style={{ width: 350, height: 200, top: -370 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    top: -105,
    marginBottom: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 50,
    color: 'white',
    top: -110,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  borderedRectangle: {
    width: 800,
    height: 100,
    backgroundColor: 'rgba(69, 34, 34, 1)',
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 10,
    position: 'absolute',
    top: 820,
    left: -10,
  },
  imageButton: {
    marginTop: 50,
    padding: 10,
    top: 160,
  },
  Stagebotton: {
    width: 10,
    height: 5,
    top: 130,
    left: -10,
  },
  Homebotton: {
    width: 10,
    height: 5,
    top: 130,
    left: -110,
  },
  Profilebotton: {
    width: 10,
    height: 5,
    top: 130,
    left: -110,
  },
  buttonImage: {
    width: 320,
    height: 180,
    top: 120,
  },
  stageImage: {
    width: 70,   
    height: 50,
    top: 160,  
    left: -10,
  },
  homeImage: {
    width: 70,           
    height: 50,
    top: 154,            
    left: -8,
    transform: [
      { rotate: '-90deg' }  
    ],
  },
  profileImage: {
    width: 70,           
    height: 50,
    top: 148,            
    left: 190,
    transform: [
      { rotate: '-90deg' }  
    ],
  },
  textStroke: {
    textShadowColor: 'black', 
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 2,
  },
});

export default CrossScreen;