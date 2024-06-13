import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import questions from '../json/questions.json';

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedDepartmentData, setSelectedDepartmentData] =
    useState<any>(null);

  const handlePickerChange = (itemValue: any) => {
    setSelectedValue(itemValue);
    if (itemValue === 'A') {
      setSelectedDepartmentData(questions?.A_departmani);
    } else if (itemValue === 'B') {
      setSelectedDepartmentData(questions?.B_departmani);
    } else if (itemValue === 'C') {
      setSelectedDepartmentData(questions?.C_departmani);
    }
  };

  const navigateToMevcutSinavlar = () => {
    navigation.navigate('Mevcut Sınavlar', {
      departmentData: selectedDepartmentData,
    });
  };

  return (
    <ScrollView>
      <Header />

      <View style={{alignItems: 'center', marginTop: 20}}>
        <Picker
          selectedValue={selectedValue}
          dropdownIconColor={'#fff'}
          style={{
            height: 50,
            width: 350,
            backgroundColor: '#1A2282',
            color: '#fff',
          }}
          onValueChange={handlePickerChange}>
          <Picker.Item
            label="Personel Grubu Seçiniz"
            value={null}
            style={{fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Mavi Yaka"
            value="A"
            style={{fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Beyaz Yaka"
            value="B"
            style={{fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Uçuş Operasyonları"
            value="C"
            style={{fontWeight: 'bold'}}
          />
        </Picker>
      </View>

      <View style={{marginTop: 50, marginBottom: 50}}>
        <View style={{alignItems: 'center', gap: 20}}>
          <TouchableOpacity
            onPress={navigateToMevcutSinavlar}
            style={{
              backgroundColor: '#fff',
              width: 350,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../images/sinav.jpg')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 7,
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: '#000',
                position: 'absolute',
                backgroundColor: '#fff',
                width: '80%',
                padding: 10,
                textAlign: 'center',
              }}>
              Mevcut Sınavlar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Oyunlar')}
            style={{
              backgroundColor: '#fff',
              width: 350,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../images/oyun.jpg')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 7,
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: '#000',
                position: 'absolute',
                backgroundColor: '#fff',
                width: '80%',
                padding: 10,
                textAlign: 'center',
              }}>
              Oyunlar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Eğitim')}
            style={{
              backgroundColor: '#fff',
              width: 350,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../images/egitim.jpg')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 7,
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: '#000',
                position: 'absolute',
                backgroundColor: '#fff',
                width: '80%',
                padding: 10,
                textAlign: 'center',
              }}>
              Eğitim
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Videolar')}
            style={{
              backgroundColor: '#fff',
              width: 350,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../images/video.jpg')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderRadius: 7,
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: '#000',
                position: 'absolute',
                backgroundColor: '#fff',
                width: '80%',
                padding: 10,
                textAlign: 'center',
              }}>
              Videolar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
