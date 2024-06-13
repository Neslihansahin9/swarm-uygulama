import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { auth } from '../../config/firebase';
import firestore from '@react-native-firebase/firestore';
import gameQuestions from '../json/game/sentences.json';
import { styles } from './GamesScreen';

export const MatchingGame: React.FC = () => {
  const [sentences, setSentences] = useState<{ id: number; text: string; word: string; }[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matchedWords, setMatchedWords] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [gold, setGold] = useState(0);
  const userUid = auth?.currentUser?.uid;
  const email = auth?.currentUser?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sentencesData = gameQuestions;
        setSentences(sentencesData);
        setMatchedWords(new Array(sentencesData.length).fill(''));
        const wordsData = sentencesData.map((sentence: { word: any; }) => sentence.word);
        const shuffledWords = shuffleArray(wordsData);
        setWords(shuffledWords);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchGold = async () => {
      if (userUid) {
        const documentSnapshot = await firestore()
          .collection('Users')
          .doc(userUid)
          .get();

        if (documentSnapshot.exists) {
          const data: any = documentSnapshot.data();
          setGold(data.gold || 0);
        } else {
          console.log('Belge bulunamadı!');
        }
      }
    };

    fetchGold();
  }, [userUid]);

  const handleWordSelect = (word: string) => {
    setSelectedWord(word);
  };

  const handleBoxPress = (sentenceId: number) => {
    if (selectedWord) {
      const index = sentences.findIndex(sentence => sentence.id === sentenceId);
      const newMatchedWords = [...matchedWords];
      const wordIndex = newMatchedWords.indexOf(selectedWord);

      if (wordIndex !== -1) {
        newMatchedWords[wordIndex] = '';
      }
      newMatchedWords[index] = selectedWord;
      setMatchedWords(newMatchedWords);
      setSelectedWord(null);
    }
  };


  const showResultsHandler = () => {
    setShowResults(true);
    const correctCount = matchedWords.filter((word, index) => word === sentences[index].word).length;
    const newGold = gold + (correctCount * 10);
    setGold(newGold);
    updatePuanInFirestore(newGold);
  };

  const updatePuanInFirestore = async (newPuan: number) => {
    if (userUid) {
      firestore()
        .collection('Users')
        .doc(userUid)
        .set({ email: email, gold: newPuan }, { merge: true })
        .then(() => {
          console.log('Update!');
        })
        .catch(error => {
          console.error('Error updating document: ', error);
        });
    } else {
      console.log('Kullanıcı oturum açmamış.');
    }
  };
  const shuffleArray = (array: any) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(function () {
    if (showResults) {
      Alert.alert('Sonuçlar', Doğru, eşleştirmeler, $, { matchedWords, : .filter((word: string, index: string | number) => word === sentences[index].word).length }, nToplam, Sahip, Olduğun, Altin, $, { gold });
    }
  }, [showResults]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wordsContainer}>
        {words.map((word, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleWordSelect(word)}
            style={[styles.wordBox, selectedWord === word && styles.selectedWord]}
          >
            <Text style={styles.wordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sentencesContainer}>
        {sentences.map((sentence, index) => (
          <TouchableOpacity
            key={sentence.id}
            style={[styles.sentenceBox]}
            onPress={() => handleBoxPress(sentence.id)}
          >
            <Text style={styles.sentenceText}>{sentence.text}</Text>
            <View style={styles.dropZone}>
              <Text style={styles.dropText}>{matchedWords[index]}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={showResultsHandler} style={styles.resultButton}>
        <Text style={styles.resultButtonText}>Sonucu Göster</Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};
