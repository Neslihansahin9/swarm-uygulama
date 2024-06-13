import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Header() {
  const navigation: any = useNavigation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate("Ana Sayfa")}>
        <Image
          source={require('../images/logo.png')}
          style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </TouchableOpacity>  
        <Text
          style={{
            color: '#1A2282',
            fontSize: 20,
            fontWeight: '900',
            width: 200,
            textAlign: 'center',
          }}>
          SWARM
        </Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu-sharp" size={30} color="#1A2282" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Header;