import React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function SecondScreen() {
  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const [textInputValue, setTextInputValue] = useState('')

  const sendDatatoBackend = async () => {
    try {
      const response = await fetch('127.0.0.1:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: textInputValue}),
      });
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>This is the new screen!</Text>
      <Text>Nome</Text>
      <TextInput style={styles.input} />
      <Text>R$/Quant(apenas numero)</Text>
      <TextInput style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={createTwoButtonAlert}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#d8d8d8',
  },
  button: {
    backgroundColor: '#16a83d',
    borderRadius: 5,
    padding: 8,
    width: 100,
    marginTop: 30,
  },
});

export default SecondScreen;
