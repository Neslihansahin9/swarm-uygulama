import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EducationScreen = () => {
  const navigation: any = useNavigation();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          height: 50,
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
        <Text style={{color: '#000', fontWeight: '600', fontSize: 16}}>
          Eğitim
        </Text>
        <View />
      </View>

      <View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate('PDF1')}
            style={{
              backgroundColor: '#1A2282',
              marginHorizontal: 24,
              height: 50,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
              Emniyet Kavramı
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PDF2')}
            style={{
              backgroundColor: '#1A2282',
              marginHorizontal: 24,
              height: 50,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
              Havacılık Kazaları
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PDF3')}
            style={{
              backgroundColor: '#1A2282',
              marginHorizontal: 24,
              height: 50,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
              Görev Tanımları
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PDF4')}
            style={{
              backgroundColor: '#1A2282',
              marginHorizontal: 24,
              height: 50,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
              Mevzuat
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default EducationScreen;
