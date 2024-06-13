import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import {auth} from '../../../config/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const RegisterScreen = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setEmailError('Geçerli bir e-posta adresi giriniz.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor.');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Şifre en az 6 karakter olmalıdır.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleRegister = async () => {
    if (
      email &&
      password &&
      confirmPassword &&
      validateEmail(email) &&
      validatePassword(password, confirmPassword)
    ) {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
        console.log('got error: ', err.message);
        Alert.alert("Kayıt Başarısız !", "E-Posta ve şifrenizi kontrol ediniz.")
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Kayıt Ol</Text>
      <TextInput
        style={{ width: 320, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
        placeholder="E-posta"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
      <TextInput
        style={{ width: 320, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={{ width: 320, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
        placeholder="Şifre Doğrulama"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
      <TouchableOpacity
        style={{ backgroundColor: '#2A409A', width: 320, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}
        onPress={handleRegister}
        disabled={loading} // Butonun tıklanabilirliğini kontrol ediyoruz
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Kaydol</Text>
        )}
      </TouchableOpacity>
      <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', marginTop: 20 }}>veya</Text>
      <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>Zaten bir hesabınız var mı?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Giriş Yap')}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#2A409A' }}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
