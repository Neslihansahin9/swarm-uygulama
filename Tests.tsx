import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {auth, configFirebase} from '../../../config/firebase';
import firestore, {firebase} from '@react-native-firebase/firestore';

const TestApp = ({route}: any) => {
  const {questions}: any = route.params;
  const userUid = auth?.currentUser?.uid;
  const email = auth?.currentUser?.email;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [puan, setPuan] = useState(0);
  const [gold, setGold] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(''),
  );

  const handleAnswer = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = selectedOptions[currentQuestionIndex];
    let newPuan = puan;
    let newGold = gold;
  
    if (selectedOption === currentQuestion.dogru_secenek) {
      newPuan += currentQuestion.puan;
      newGold += currentQuestion.gold;
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  
    setPuan(newPuan);
    setGold(newGold);
  
    if (!firebase.apps.length) {
      firebase.initializeApp(configFirebase);
    }
  
    if (currentQuestionIndex === questions.length - 1) {
      handleGold(newPuan, newGold);
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleGold = (newPuan:any, newGold:any) => {
    if (userUid) {
      firestore()
        .collection('Users')
        .doc(userUid)
        .set({email: email, puan: newPuan, gold: newGold}, {merge: true})
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
  
  const fetchData = async () => {
    const documentSnapshot = await firestore()
      .collection('Users')
      .doc(userUid)
      .get();

    if (documentSnapshot.exists) {
      const data: any = documentSnapshot.data();
      setGold(data.gold);
      setPuan(data.puan);
    } else {
      console.log('Belge bulunamadı!');
    }
  };

  useEffect(() => {
    fetchData();
  }, [userUid]);

  const handleOptionSelect = (option: any) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextButtonText = () => {
    return currentQuestionIndex === questions.length - 1
      ? 'Testi Bitir'
      : 'Sonraki Soru';
  };

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>Test Sonucu</Text>
        <Text>Doğru Cevaplar: {correctAnswers}</Text>
        <Text style={{marginTop: 10}}>Yanlış Cevaplar: {wrongAnswers}</Text>
        <Text style={{marginTop: 10}}>
          Gold: {gold}
        </Text>
        <Text style={{marginTop: 10}}>Puanınız: {puan}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionCounter}>
        Soru {currentQuestionIndex + 1}/{questions.length}
      </Text>
      <Text style={styles.questionText}>
        {questions[currentQuestionIndex].soru}
      </Text>
      <View style={styles.optionsContainer}>
        {questions[currentQuestionIndex].secenekler.map(
          (option: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOptions[currentQuestionIndex] === option &&
                  styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}>
              <Text
                style={[
                  styles.optionText,
                  selectedOptions[currentQuestionIndex] === option &&
                    styles.selectedOptionText,
                ]}>
                {String.fromCharCode(65 + index)}. {option}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navigationButton, {marginRight: 10}]}
          onPress={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}>
          <Text style={styles.buttonText}>Önceki Soru</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={handleAnswer}
          disabled={selectedOptions[currentQuestionIndex] === ''}>
          <Text style={styles.buttonText}>{handleNextButtonText()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionCounter: {
    marginBottom: 10,
    fontSize: 16,
  },
  questionText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
    width: '100%',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: 'blue',
  },
  selectedOptionText: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  navigationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  buttonText: {
    fontSize: 16,
  },
  resultText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TestApp;
