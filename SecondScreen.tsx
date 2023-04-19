import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, StatusBar, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface User {
  _id: string;
  name: string;
}

interface Cost {
  _id: string;
  preco: number;
  peso: number;
}

function SecondScreen() {
  const [textInputValue, setTextInputValue] = useState('');
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [totalcustos, setTotalCustos] = useState<Number>(0);
  const [dataFetched, setDataFetched] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    getTotalCosts();
    console.log('Component mounted');
  }, []);

  const getTotalCosts = async () => {
    try {
      const response = await fetch('http://10.50.63.88:3001/todoscustos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Success GET');
      const result = await response.json();
      const precoArray: number[] = result.map((obj: Cost) => obj.preco);
      const total: number = precoArray.reduce(
        (accumulator: number, currentValue: number) =>
        accumulator + currentValue,0);
      setTotalCustos(total);
      console.log('Elements: ', result);
      setUsuarios(result);
      setDataFetched(true);
      console.log('total dos custos', total);
    } catch (error) {
      console.error('Error:', error);
      console.log('cannot GET');
    }
  };

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

  // const renderTotalCost = () => {
  //   if (!dataFetched) {
  //     return null;
  //   } else {
  //     return (
  //       <View>
  //         {custos.map(item => {
  //           return <Text key={item._id}>{totalCost}</Text>;
  //         })}
  //       </View>
  //     );
  //   }
  // };

  return (
    <>
      <View style={styles.mainView}>
        <View style={styles.welcome1}>
          <Text style={styles.welcome2}>Bem vindo,{'\n'}Fulano!</Text>
          <View style={styles.avatarView}>
            <Image style={styles.avatar} source={require('./avatar.jpeg')} />
          </View>
        </View>
        {/* <Text>{totalcustos}</Text> */}
        <View style={styles.currentCost}>
          <Text style={styles.currentCostDesc}>seu gasto no mês atual:</Text>
          <Text style={styles.currentCostText}>R$ {totalcustos}</Text>
        </View>
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
          <View style={styles.Bar1}></View>
          <View style={styles.Bar1}></View>
          <View style={styles.Bar1}></View>
          <View style={styles.Bar1}></View>
          <View style={styles.Bar1}></View>
        </View>
      </View>
    </>
  );
}

const barHeight = 55;

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
  avatarView: {
    backgroundColor: 'grey',
    textAlign: 'right',
    width: '57%',
    alignItems: 'flex-end',
  },
  currentCost: {
    backgroundColor: 'green',
    width: '100%',
  },
  currentCostDesc: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  currentCostText: {
    fontWeight: '700',
    fontSize: 45,
    alignSelf: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    marginTop: 15,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignSelf: 'auto',
    marginRight: 10,
  },
  welcome1: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'red',
    paddingLeft: 8,
  },
  welcome2: {
    fontSize: 32,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  chartArea: {
    height: 150,
    width: 350,
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'blue',
    borderWidth: 5,
  },
  Bar1: {
    height: barHeight,
    width: 20,
    backgroundColor: 'green',
    margin: 'auto',
    alignSelf: 'flex-end',
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
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
