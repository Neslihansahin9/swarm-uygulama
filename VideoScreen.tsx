// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import YouTube from 'react-native-youtube';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <YouTube
//         videoId="dJvO-UOAw68&list=RDQMAbzJ6VH32LU&index=6"
//         apiKey="AIzaSyAcDzsXW8402_Kooq7P-FSLzCaOv22fCV4"
//         play // control playback of video with true/false
//         fullscreen // control whether the video should play in fullscreen or inline
//         loop // control whether the video should loop when ended
//         style={{alignSelf: 'stretch', height: 300}}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });

// export default App;

// https://www.youtube.com/watch?v=gwPxEIN2gyM
// https://youtu.be/gwPxEIN2gyM

import {useNavigation} from '@react-navigation/native';
import React, {useState, useCallback} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';

function VideoScreen() {
  const navigation: any = useNavigation();

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          height: 50,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={28}
            style={{
              color: '#000',
            }}
          />
        </TouchableOpacity>
        <Text style={{color: '#000', fontWeight: '400', fontSize: 16}}>
          Videolar
        </Text>
        <View />
      </View>
      <YoutubePlayer height={230} play={false} videoId={'PtkSwuvm9Yg'} />
      <Text
        style={{
          color: "#000",
          fontSize: 16,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 25,
        }}>
        What is Safety Management System (SMS)?{' '}
      </Text>
      <YoutubePlayer height={230} play={false} videoId={'OyxXF0jC3gM'} />
      <Text
        style={{
          color: "#000",
          fontSize: 16,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 25,
        }}>
        ICAO: International Civil Aviation Organization - Explained in 6
        Minutes!{' '}
      </Text>
      <YoutubePlayer height={230} play={false} videoId={'ioaO8PB2hkc'} />
      <Text
        style={{
          color: "#000",
          fontSize: 16,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 25,
        }}>
        The Importance of Safety Reporting (Safety Management System)
      </Text>
      <YoutubePlayer height={230} play={false} videoId={'WLZPNyyAPaw'} />
      <Text
        style={{
          color: "#000",
          fontSize: 16,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: 25,
        }}>
        Aurion Learning (SMS) Safety Management System - An Introduction
      </Text>
    </ScrollView>
  );
}

export default VideoScreen;
