import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitle: 'Hoş Geldiniz'}}>
      <Stack.Screen name="Giriş Yap" component={LoginScreen} />
      <Stack.Screen name="Kayıt Ol" component={RegisterScreen} />
      <Stack.Screen name="Şifremi Unuttum" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
