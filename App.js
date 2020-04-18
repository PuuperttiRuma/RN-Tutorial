import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';

import Header from './components/Header';
import Todo from './components/Todo';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessedRounds, setGuessedRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setGuessedRounds(0);
    setUserNumber(selectedNumber);
  }

  const  gameOverHandler = numOfRounds => {
    setGuessedRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessedRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessedRounds > 0){
    content = <GameOverScreen />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />      
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
