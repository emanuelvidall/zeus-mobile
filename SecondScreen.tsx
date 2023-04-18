import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface User {
  _id: string;
  name: string;
}

function SecondScreen() {
  const [textInputValue, setTextInputValue] = useState('');
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

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

  const getDataFromBackend = async () => {
    try {
      const response = await fetch('http://10.50.63.88:3001/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Success GET');
      const result = await response.json();
      console.log('Elements: ', result);
      setUsuarios(result);
      setDataFetched(true);
    } catch (error) {
      console.error('Error:', error);
      console.log('cannot GET');
    }
  };

  console.log('Usuarios:', usuarios);

  const renderUsuarios = () => {
    if (!dataFetched) {
      return null;
    } else {
      return (
        <View>
          {usuarios.map(item => {
            return <Text key={item._id}>User: {item.name}</Text>;
          })}
        </View>
      );
    }
  };

  return (
    <View style={styles.mainView}>
      <Text>Adicione o Gasto! 💰</Text>
      <TextInput style={styles.input} onChangeText={setTextInputValue} />
      <TouchableOpacity style={styles.button} onPress={sendDatatoBackend}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 20}}>POST</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getDataFromBackend}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>GET</Text>
        </View>
      </TouchableOpacity>
      <View>{renderUsuarios()}</View>
      <View style={styles.chartArea}>
        <View style={styles.Bar1}></View>
      </View>
    </View>
  );
}

const barHeight = 13;

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
  chartArea: {
    height: 200,
    width: 200,
    backgroundColor: 'blue',
    marginTop: 20,
  },
  Bar1: {
    height: barHeight,
    width: 10,
    backgroundColor: 'green',
    alignSelf: 'center',
    verticalAlign: 'middle',
  },
  area1: {
    height: 200,
    width: 200,
    backgroundColor: 'red',
  },
  render: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
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
