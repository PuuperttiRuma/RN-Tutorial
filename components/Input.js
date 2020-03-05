import React from 'react';
import {TextInput, StyleSheet } from 'react-native';
import { getOrientationAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';

const Input = props => {
  return (
    <TextInput {...props} style={{ ...styles.input, ...props.style }} />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    marginVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  }
});

export default Input;
