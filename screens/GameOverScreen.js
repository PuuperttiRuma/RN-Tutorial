import React from 'react';
import { View, StyleSheet, Text, Button, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from '../components/MainButton';
import colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <ScrollView >
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/success.png')}
            //source={{uri: 'https://peda.net/lahti/koulut/tiirismaa/ecol/cnt/sesv/sivu-1/keskustelualue/a-k/mountain-jpg:file/download/09f0a88f6ac933cf73da97071cb3c492c0babc83/mountain.jpg'}}
            //fadeDuration={3000}
            resizeMode="cover" />
        </View>
        <View style={styles.resultsContainer}>
          <BodyText style={styles.resultText}>
            Computer guessed the number <Text style={styles.highlight}>{props.userNumber}</Text> and took <Text style={styles.highlight}>{props.guessedRounds}</Text> rounds to guess it!
        </BodyText>
        </View>
        <View style={styles.buttonContainer}>
          <MainButton onPress={props.onRestart}>New Game</MainButton>
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7, //HUOM! Käytetty leveyttä jotta saadaan ympyrä!
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    margin: Dimensions.get('window').height / 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    margin: 20,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height > 600 ? 20 : 16,
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultsContainer: {
    width: '80%'
  }
});

export default GameOverScreen;