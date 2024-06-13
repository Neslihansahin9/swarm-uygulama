import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import {Text, TouchableOpacity, View} from 'react-native';
import useAuth from '../../hooks/useAuth';
import {signOut} from 'firebase/auth';
import {auth} from '../../config/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountScreen from '../screens/AccountScreen';
import ScoreScreen from '../screens/ScoreScreen';
import AnketScreen from '../screens/AnketScreen';
import StoreScreen from '../screens/StoreScreen';
import AboutScreen from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: any) => {
  const {user}: any = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#1A2282'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}>
          <Ionicons
            name="person-circle-outline"
            size={100}
            style={{
              color: '#fff',
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
              width: 250,
              textAlign: 'center',
              marginTop: 2,
            }}>
            Hoşgeldiniz
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 14,
              maxWidth: 235,
              marginTop: 10,
            }}>
            {user?.email}
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          alignItems: 'center',
          gap: 20,
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: '600',
              color: 'red',
              fontSize: 16,
            }}>
            Çıkış Yap
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="Ana Sayfa"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}>
      <Drawer.Screen name="Ana Sayfa" component={HomeScreen} />
      <Drawer.Screen name="Skorlarım" component={ScoreScreen} />
      <Drawer.Screen name="Anketlerim" component={AnketScreen} />
      <Drawer.Screen name="Mağaza" component={StoreScreen} />
      <Drawer.Screen name="Hesabım" component={AccountScreen} />
      <Drawer.Screen name="Hakkımızda" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;  