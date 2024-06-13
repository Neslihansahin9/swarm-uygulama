import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {auth, configFirebase} from '../../../config/firebase';
import firestore, {firebase} from '@react-native-firebase/firestore';

const QuizScreen = ({route}: any) => {
  const {departmentData}: any = route.params;
  const navigation: any = useNavigation();
  const userUid = auth?.currentUser?.uid;
  const [puan, setPuan] = useState(0);

  const KolayTest1 = departmentData?.kolay_sinav?.['1.Test'];
  const KolayTest2 = departmentData?.kolay_sinav?.['2.Test'];
  const KolayTest3 = departmentData?.kolay_sinav?.['3.Test'];
  const KolayTest4 = departmentData?.kolay_sinav?.['4.Test'];

  const OrtaTest1 = departmentData?.orta_sinav?.['1.Test'];
  const OrtaTest2 = departmentData?.orta_sinav?.['2.Test'];
  const OrtaTest3 = departmentData?.orta_sinav?.['3.Test'];
  const OrtaTest4 = departmentData?.orta_sinav?.['4.Test'];

  const ZorTest1 = departmentData?.zor_sinav?.['1.Test'];
  const ZorTest2 = departmentData?.zor_sinav?.['2.Test'];
  const ZorTest3 = departmentData?.zor_sinav?.['3.Test'];
  const ZorTest4 = departmentData?.zor_sinav?.['4.Test'];

  if (!firebase.apps.length) {
    firebase.initializeApp(configFirebase);
  }

  const fetchData = async () => {
    const documentSnapshot = await firestore()
      .collection('Users')
      .doc(userUid)
      .get();

    if (documentSnapshot.exists) {
      const data: any = documentSnapshot.data();
      setPuan(data.puan);
    } else {
      console.log('Puan bulunamadı!');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={28}
            style={{
              color: '#000',
            }}
          />
        </TouchableOpacity>
        <Text style={{color: '#000', fontWeight: '400', fontSize: 16}}>
          Mevcut Sınavlar
        </Text>
        {puan > 0 ? (
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: '600', fontSize: 16, color: '#000'}}>
              Puan
            </Text>
            <Text style={{fontWeight: '600', fontSize: 16, color: '#000'}}>
              {puan}
            </Text>
          </View>
        ) : (
          <View />
        )}
      </View>
      {departmentData == null ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#000', fontWeight: '400'}}>
            Lütfen personel grubu seçiniz !
          </Text>
        </View>
      ) : (
        <>
          <View style={{marginBottom: 24, marginTop: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
              Kolay Testler
            </Text>
            <TouchableOpacity
              style={{backgroundColor: '#1A2282', padding: 10}}
              onPress={() =>
                navigation.navigate('Tests', {questions: KolayTest1})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor: '#1A2282', padding: 10, marginTop: 10}}
              onPress={() =>
                navigation.navigate('Tests', {questions: KolayTest2})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor: '#1A2282', padding: 10, marginTop: 10}}
              onPress={() =>
                navigation.navigate('Tests', {questions: KolayTest3})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor: '#1A2282', padding: 10, marginTop: 10}}
              onPress={() =>
                navigation.navigate('Tests', {questions: KolayTest4})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 4
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginBottom: 24}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
              Orta Testler
            </Text>
            <TouchableOpacity
              disabled={puan >= 400 ? false : true}
              style={{
                backgroundColor: puan >= 400 ? '#1A2282' : 'gray',
                padding: 10,
              }}
              onPress={() =>
                navigation.navigate('Tests', {questions: OrtaTest1})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={puan >= 400 ? false : true}
              style={{
                backgroundColor: puan >= 400 ? '#1A2282' : 'gray',
                padding: 10,
                marginTop: 10,
              }}
              onPress={() =>
                navigation.navigate('Tests', {questions: OrtaTest2})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={puan >= 400 ? false : true}
              style={{
                backgroundColor: puan >= 400 ? '#1A2282' : 'gray',
                padding: 10,
                marginTop: 10,
              }}
              onPress={() =>
                navigation.navigate('Tests', {questions: OrtaTest3})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={puan >= 400 ? false : true}
              style={{
                backgroundColor: puan >= 400 ? '#1A2282' : 'gray',
                padding: 10,
                marginTop: 10,
              }}
              onPress={() =>
                navigation.navigate('Tests', {questions: OrtaTest4})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 4
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 24}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
              Zor Testler
            </Text>
            <TouchableOpacity
              disabled={puan >= 800 ? false : true}
              style={{
                backgroundColor: puan >= 800 ? '#1A2282' : 'gray',
                padding: 10,
              }}
              onPress={() =>
                navigation.navigate('Tests', {questions: ZorTest1})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={puan >= 800 ? false : true}
              style={{
                backgroundColor: puan >= 800 ? '#1A2282' : 'gray',
                padding: 10,
                marginTop: 10,
              }}
              onPress={() =>
                navigation.navigate('Tests', {questions: ZorTest2})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={puan >= 800 ? false : true}
              style={{
                backgroundColor: puan >= 800 ? '#1A2282' : 'gray',
                padding: 10,
                marginTop: 10,
              }}
              onPress={() =>
                navigation.navigate('Tests', {questions: ZorTest3})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={puan >= 800 ? false : true}
              style={{
                backgroundColor: puan >= 800 ? '#1A2282' : 'gray',
                padding: 10,
                marginTop: 10,
              }}
              onPress={() =>
                navigation.navigate('Tests', {questions: ZorTest4})
              }>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Test 4
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default QuizScreen;
