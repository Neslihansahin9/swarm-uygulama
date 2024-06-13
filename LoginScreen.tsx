import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../config/firebase';
import { Image } from 'react-native';

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Doğrulama işlemi
    if (!email) {
      setEmailError('E-posta adresi gerekli');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Geçerli bir e-posta adresi girin');
      return;
    }
    setEmailError('');
    setLoading(true);

    // Giriş işlemi
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log('Hata oluştu: ', err.message);
      Alert.alert('Hata!', 'Giriş yapılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <Image
        source={require('../../images/girislogo.png')}
        style={{ width: 300, height: 120,marginBottom: 60, resizeMode: 'cover' }}
      />
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
        Giriş Yap
      </Text>
      <TextInput
        style={{
          width: 320,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
        placeholder="E-Posta"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={text => {
          if (text.endsWith('@') && !email.endsWith('@')) {
            setEmail(text + 'gmail.com');
          } else {
            setEmail(text);
          }
        }}
      />
      {emailError ? (
        <Text style={{color: 'red', marginBottom: 10, fontSize: 13}}>
          {emailError}
        </Text>
      ) : null}

      <TextInput
        style={{
          width: 320,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Şifremi Unuttum')}>
        <Text
          style={{
            width: 320,
            textAlign: 'right',
            fontSize: 15,
            fontWeight: '600',
            color: 'gray',
          }}>
          Şifrenizi mi unuttunuz?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#2A409A',
          width: 320,
          height: 40,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Giriş
          </Text>
        )}
      </TouchableOpacity>
    
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: 'black',
          marginTop: 20,
        }}>
        veya
      </Text>
      <View style={{flexDirection: 'row', gap: 5, marginTop: 10}}>
        <Text style={{fontSize: 16, fontWeight: '400', color: 'black'}}>
          Hesabınız yok mu?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Kayıt Ol')}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#2A409A'}}>
            Kayıt Ol
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
