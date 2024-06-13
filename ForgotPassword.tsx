import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../../../config/firebase';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
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
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Başarılı', 'Sıfırlama bağlantısı başarıyla gönderildi.');
    } catch (err:any) {
      console.log('Hata oluştu: ', err.message);
      Alert.alert('Hata !', 'Sıfırlama bağlantısı gönderilemedi.');
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
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Şifremi Unuttum
      </Text>
      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
        placeholder="E-posta"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      {emailError ? <Text style={{ color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}
      <TouchableOpacity
        style={{
          backgroundColor: '#2A409A',
          width: '100%',
          height: 40,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleForgotPassword}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: 'white', fontSize: 16 }}>Gönder</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
