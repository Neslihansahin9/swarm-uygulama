import { View, Text, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth, configFirebase } from '../../config/firebase';
import firestore, { firebase } from '@react-native-firebase/firestore';

const ScoreScreen = () => {
  const userUid = auth?.currentUser?.uid;
  const [puan, setPuan] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  if (!firebase.apps.length) {
    firebase.initializeApp(configFirebase);
  }

  const fetchData = async () => {
    const documentSnapshot = await firestore()
      .collection('Users')
      .doc(userUid)
      .get();

    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();
      if (data !== undefined) { // data undefined değilse
        setPuan(data.puan);
      } else {
        setPuan(0);
      }
    } else {
      console.log('Puan bulunamadı!');
    }
  };

  useEffect(() => {
    fetchData();
    calculateDaysLeft();
  }, [userUid]);

  const calculateDaysLeft = () => {
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, 0, 1);
    const differenceInTime = nextYear.getTime() - today.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    setDaysLeft(differenceInDays);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <Text style={{ color: '#000', fontWeight: '600', fontSize: 16, textAlign: "center" }}>
        Puanınız: {puan}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'center', marginTop:10}}>
      <Image
          source={require('../images/sand-clock.jpeg')}
          style={{ width: 24, height: 24, resizeMode: 'cover' }}
        />
        <Text style={{ color: '#000', fontWeight: '600', fontSize: 16 }}>
          Kalan gün {daysLeft} 
        </Text>
        
      </View>

      <View style={{ flex: 1, justifyContent: 'center', gap: 50 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {puan >= 960 ? (
            <Image
              source={require('../images/altin-madalyon.png')}
              style={{ width: 100, height: 100, resizeMode: 'cover' }}
            />
          ) : (
            <Image
              source={require('../images/altin-madalyon-gri.png')}
              style={{ width: 100, height: 100, resizeMode: 'cover' }}
            />
          )}
          <Text style={{ fontSize: 20, fontWeight: '900', marginLeft: 10 }}>
            Altın Madalyon
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {puan >= 640 ? (
            <Image
              source={require('../images/bronz-madalyon.png')}
              style={{ width: 100, height: 100, resizeMode: 'cover' }}
            />
          ) : (
            <Image
              source={require('../images/bronz-madalyon-gri.png')}
              style={{ width: 100, height: 100, resizeMode: 'cover' }}
            />
          )}
          <Text style={{ fontSize: 20, fontWeight: '900', marginLeft: 10 }}>
            Bronz Madalyon
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {puan >= 320 ? (
            <Image
              source={require('../images/gumus-madalyon.png')}
              style={{ width: 100, height: 100, resizeMode: 'cover' }}
            />
          ) : (
            <Image
              source={require('../images/gumus-madalyon-gri.png')}
              style={{ width: 100, height: 100, resizeMode: 'cover' }}
            />
          )}
          <Text style={{ fontSize: 20, fontWeight: '900', marginLeft: 10 }}>
            Gümüs Madalyon
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScoreScreen;