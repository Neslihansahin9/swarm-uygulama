import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from '../components/DrawerNavigation';
import QuizScreen from '../screens/Quiz/QuizScreen';
import GamesScreen from '../screens/GamesScreen';
import EducationScreen from '../screens/EducationScreen/EducationScreen';
import VideoScreen from '../screens/VideoScreen';
import PDF1 from '../screens/EducationScreen/PDF/PDF1';
import PDF2 from '../screens/EducationScreen/PDF/PDF2';
import PDF3 from '../screens/EducationScreen/PDF/PDF3';
import PDF4 from '../screens/EducationScreen/PDF/PDF4';
import Tests from '../screens/Quiz/Tests';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigation"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen name="Mevcut Sınavlar" component={QuizScreen} />
      <Stack.Screen name="Oyunlar" component={GamesScreen} />
      <Stack.Screen name="Eğitim" component={EducationScreen} />
      <Stack.Screen name="Videolar" component={VideoScreen} />
      <Stack.Screen name="Tests" component={Tests} />
      <Stack.Screen name="PDF1" component={PDF1} />
      <Stack.Screen name="PDF2" component={PDF2} />
      <Stack.Screen name="PDF3" component={PDF3} />
      <Stack.Screen name="PDF4" component={PDF4} />
    </Stack.Navigator>
  );
};

export default AppStack;