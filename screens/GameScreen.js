import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

// Scrollview
// const renderListItem = (value, rndNumber) => (
//   <View key={value} style={styles.listItem}>
//     <BodyText>#{rndNumber}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>);

//Flatlist
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>);

const GameScreen = props => {
  const firstGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(firstGuess);
  // const [pastGuesses, setPastGuesses] = useState([firstGuess]); //Scrollview
  const [pastGuesses, setPastGuesses] = useState([firstGuess.toString()]);  //Flatlist
  const [windowHeight, setWindowHeight] = useState([Dimensions.get('window').height]);
  const [windowWidth, setWindowWidth] = useState([Dimensions.get('window').width]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setWindowHeight(Dimensions.get('window').height);
      setWindowWidth(Dimensions.get('window').width);
    }
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (direction === 'lower' && currentGuess < props.userChoice
      || direction === 'higher' && currentGuess > props.userChoice) {
      Alert.alert("Don\'t lie!", "You know that this is wrong...", [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    //setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);

    //setRounds(rounds => rounds + 1);
  }

  if (windowHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>          
          <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>          
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    )
  };

  return (    
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 7,
    width: 300,
    maxWidth: '80%'
  },
  controls:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 500 ? '60%' : '80%',
  },
  list: {
    flexGrow: 1,
    //alignItems: 'center',  //Ei tarvitse Flatlistillä
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default GameScreen;