import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.aboutContainer}>
          <Image source={require('../images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Hakkımızda</Text>
          <Text style={styles.text}>
          Bu çalışma “Havacılık Emniyeti Farkındalığı Artırma Çalışmalarının Çalışan Profiline Göre Planlanması” konusu özelinde 2023-2024 Dönemi TUSAŞ LIFT UP Sanayi Odaklı Lisans Bitirme Projeleri Programı çerçevesinde desteklenmiştir. 
          Prof. Dr. Sermin Elevli’nin akademik danışmanlığında çalışmalarını yürüten Ondokuz Mayıs Üniversitesi Endüstri Mühendisliği Bölümü öğrencilerinden kurulu SWARM Proje Ekibi üyeleri:{'\n'}

            {'\n'}
            Ayşe TALASLI{'\n'}
            Burak GÜLENÇ{'\n'}
            Ceren Melek ÖZDEMİR{'\n'}
            Eylül KOÇAK{'\n'}
            Neslihan ŞAHİN
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  aboutContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
    color: '#333',
  },
});

export default AboutScreen;
