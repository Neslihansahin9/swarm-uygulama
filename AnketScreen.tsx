import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import anket from '../json/anket.json';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const TestApp = () => {
  const questions = anket.anket;
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill('')
  );

  const handleAnswer = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleOptionSelect = (option: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleTextInputChange = (text: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = text;
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
      <>
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} size={22} color="#000" />
        </TouchableOpacity>
        <View style={styles.container}>
          <Ionicons
            name="checkmark-circle-outline"
            size={100}
            style={{
              color: 'green',
              marginBottom: 10,
            }}
          />
          <Text style={styles.resultText}>
            Anketimize katıldığınız için teşekkür ederiz.{' '}
          </Text>
        </View>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionCounter}>
        Soru {currentQuestionIndex + 1}/{questions.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.soru}</Text>
      <View style={styles.optionsContainer}>
        {currentQuestion.acikUclu ? (
          <TextInput
            style={styles.textInput}
            value={selectedOptions[currentQuestionIndex]}
            onChangeText={handleTextInputChange}
            placeholder="Cevabınızı buraya yazın"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        ) : (
          currentQuestion.secenekler.map((option, index) => (
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
          ))
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navigationButton, { marginRight: 10 }]}
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
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
    backgroundColor: '#f9f9f9',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestApp;