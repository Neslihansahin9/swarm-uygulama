import {NavigationContainer} from '@react-navigation/native';
import AppStack from './stacks/AppStack';
import AuthStack from './stacks/AuthStack';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

function App() {
  const {user} = useAuth();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;