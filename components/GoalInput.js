import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  }

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal("");
  }

  const cancelGoalHandler = () => {
    props.onCancel();
    setEnteredGoal("");
  }

  return (
    <Modal visible={props.visible} animationType="slide" >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={cancelGoalHandler} color="red" />
          </View>
          <View style={styles.button}>
            <Button title="Add" onPress={addGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  button: {
    width: '40%'
  }
});

export default GoalInput;