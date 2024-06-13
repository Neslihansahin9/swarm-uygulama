import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {auth, configFirebase} from '../../config/firebase';
import firestore, {firebase} from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const StoreScreen = () => {
  const userUid = auth?.currentUser?.uid;
  const [gold, setGold] = useState(0);
  const navigation:any = useNavigation();

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
      setGold(data.gold);
    } else {
      console.log('Belge bulunamadı!');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../images/gold-icon.png')}
          style={{width: 30, height: 30, resizeMode: 'contain'}}
        />
        <Text style={{color: '#000', fontWeight: '600', fontSize: 16}}>
          {gold} Gold
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 50,
            paddingLeft: 24,
            paddingRight: 24,
            gap: 80,
            marginBottom: 100,
          }}>
          <View style={{alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              onPress={() => {
                {
                  gold >= 300
                    ? Alert.alert(
                        'Başarılı !',
                        'Tebrikler Siyah Kupa satın aldınız.',
                      )
                    : Alert.alert(
                        'Satın alınamadı !',
                        'Malesef yeterli altınınız bulunmamaktadır!',
                      );
                }
              }}>
              <Image
                source={require('../images/siyah-kupa.png')}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              Siyah Kupa
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#E8A028'}}>
              300 Gold
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              onPress={() => {
                {
                  gold >= 300
                    ? Alert.alert(
                        'Başarılı !',
                        'Tebrikler Siyah Kupa satın aldınız.',
                      )
                    : Alert.alert(
                        'Satın alınamadı !',
                        'Malesef yeterli altınınız bulunmamaktadır!',
                      );
                }
              }}>
              <Image
                source={require('../images/kirmizi-kupa.png')}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              Kırmızı Kupa
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#E8A028'}}>
              300 Gold
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              onPress={() => {
                {
                  gold >= 300
                    ? Alert.alert(
                        'Başarılı !',
                        'Tebrikler Siyah Kupa satın aldınız.',
                      )
                    : Alert.alert(
                        'Satın alınamadı !',
                        'Malesef yeterli altınınız bulunmamaktadır!',
                      );
                }
              }}>
              <Image
                source={require('../images/beyaz-kupa.png')}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              Beyaz Kupa
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#E8A028'}}>
              300 Gold
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              onPress={() => {
                {
                  gold >= 500
                    ? Alert.alert(
                        'Başarılı !',
                        'Tebrikler Siyah Kupa satın aldınız.',
                      )
                    : Alert.alert(
                        'Satın alınamadı !',
                        'Malesef yeterli altınınız bulunmamaktadır!',
                      );
                }
              }}>
              <Image
                source={require('../images/t-shirt-siyah.png')}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              Siyah T-shirt
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#E8A028'}}>
              500 Gold
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              onPress={() => {
                {
                  gold >= 500
                    ? Alert.alert(
                        'Başarılı !',
                        'Tebrikler Siyah Kupa satın aldınız.',
                      )
                    : Alert.alert(
                        'Satın alınamadı !',
                        'Malesef yeterli altınınız bulunmamaktadır!',
                      );
                }
              }}>
              <Image
                source={require('../images/since-tshirt.png')}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              Tarihli T-shirt
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#E8A028'}}>
              500 Gold
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              onPress={() => {
                {
                  gold >= 500
                    ? Alert.alert(
                        'Başarılı !',
                        'Tebrikler Siyah Kupa satın aldınız.',
                      )
                    : Alert.alert(
                        'Satın alınamadı !',
                        'Malesef yeterli altınınız bulunmamaktadır!',
                      );
                }
              }}>
              <Image
                source={require('../images/yesil-tshirt.png')}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              Yeşil T-shirt
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#E8A028'}}>
              500 Gold
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              onPress={() => {
                {
                  gold >= 1000
                    ? Alert.alert(
                        'Başarılı !',
                        'Tebrikler Siyah Kupa satın aldınız.',
                      )
                    : Alert.alert(
                        'Satın alınamadı !',
                        'Malesef yeterli altınınız bulunmamaktadır!',
                      );
                }
              }}>
              <Image
                source={require('../images/ucak-maketi-1.png')}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              Uçak Maketi
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#E8A028'}}>
              1000 Gold
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              onPress={() => {
                {
                  gold >= 1000
                    ? Alert.alert(
                        'Başarılı !',
                        'Tebrikler Siyah Kupa satın aldınız.',
                      )
                    : Alert.alert(
                        'Satın alınamadı !',
                        'Malesef yeterli altınınız bulunmamaktadır!',
                      );
                }
              }}>
              <Image
                source={require('../images/ucak-maketi-2.png')}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              Uçak Maketi
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#E8A028'}}>
              1000 Gold
            </Text>
          </View>
          <View style={{alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              onPress={() => {
                {
                  gold >= 1000
                    ? Alert.alert(
                        'Başarılı !',
                        'Tebrikler Siyah Kupa satın aldınız.',
                      )
                    : Alert.alert(
                        'Satın alınamadı !',
                        'Malesef yeterli altınınız bulunmamaktadır!',
                      );
                }
              }}>
              <Image
                source={require('../images/ucak-maketi-3.png')}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              Uçak Maketi
            </Text>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#E8A028'}}>
              1000 Gold
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreScreen;
