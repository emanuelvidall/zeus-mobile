import React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function SecondScreen() {
  const [textInputValue, setTextInputValue] = useState('');

  const sendDatatoBackend = async () => {
    try {
      const response = await fetch('http://10.50.63.88:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: textInputValue}),
      });
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
      console.log(JSON.stringify({name: textInputValue}));
    }
  };

  return (
    <View style={styles.mainView}>
      <Text>Adicione o Gasto! 💰</Text>
      <TextInput style={styles.input} onChangeText={setTextInputValue} />
      <TouchableOpacity style={styles.button} onPress={sendDatatoBackend}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Centered text</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '30%',
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
    padding: 2,
    width: 100,
    marginTop: 30,
    height: 30,
  },
  mainView: {
    alignItems: 'center',
  },
});

export default SecondScreen;
