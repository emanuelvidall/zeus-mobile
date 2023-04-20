import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, StatusBar, Image, TouchableWithoutFeedback} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BarGraph from './BarGraph';
import {Lista} from './ListItems';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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

  // const Tab = createBottomTabNavigator();

  // function MyTabs() {
  //   return (
  //     <Tab.Navigator>
  //       <Tab.Screen name="Home" component={FirstScreen} />
  //       <Tab.Screen name="Settings" component={FirstScreen} />
  //     </Tab.Navigator>
  //   );
  // }

  useEffect(() => {
    setIsMounted(true);
    getTotalCosts();
    console.log('Component mounted');
  }, []);

  const getTotalCosts = async () => {
    try {
      const response = await fetch('http://10.50.63.108:3001/todoscustos', {
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

  // const sendDatatoBackend = async () => {
  //   try {
  //     const response = await fetch('http://10.50.63.88:3001/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({name: textInputValue}),
  //     });
  //     const result = await response.json();
  //     console.log('Success:', result);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     console.log(JSON.stringify({name: textInputValue}));
  //   }
  // };

  // const getDataFromBackend = async () => {
  //   try {
  //     const response = await fetch('http://10.50.63.88:3001/users', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log('Success GET');
  //     const result = await response.json();
  //     console.log('Elements: ', result);
  //     setUsuarios(result);
  //     setDataFetched(true);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     console.log('cannot GET');
  //   }
  // };

  // console.log('Usuarios:', usuarios);

  // const renderUsuarios = () => {
  //   if (!dataFetched) {
  //     return null;
  //   } else {
  //     return (
  //       <View>
  //         {usuarios.map(item => {
  //           return <Text key={item._id}>User: {item.name}</Text>;
  //         })}
  //       </View>
  //     );
  //   }
  // };

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
      <StatusBar hidden={true} translucent={true} />
      <View style={styles.mainView}>
        <View style={styles.welcome1}>
          <Text style={styles.welcome2}>Bem vindo,{'\n'}Fulano!</Text>
          <View style={styles.avatarView}>
            <Image style={styles.avatar} source={require('./avatar.jpeg')} />
          </View>
        </View>
        {/* <Text>{totalcustos}</Text> */}
        <View style={styles.currentCost}>
          <Text style={styles.currentCostDesc}>Seu gasto no mês atual:</Text>
          <Text style={styles.currentCostText}>R$ {totalcustos}</Text>
        </View>
        {/* <Text>Adicione o Gasto! 💰</Text>
        <TextInput style={styles.input} onChangeText={setTextInputValue} /> */}
        {/* <TouchableOpacity style={styles.button} onPress={sendDatatoBackend}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 20}}>POST</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getDataFromBackend}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>GET</Text>
          </View>
        </TouchableOpacity> */}
        {/* <View>{renderUsuarios()}</View> */}
        <View>
          <Text style={styles.textoGrafico}>Histórico de Gastos</Text>
        </View>
        <View style={styles.chartArea}>
          {/* <View style={styles.Bar1}></View>
          <View style={styles.Bar1}></View>
          <View style={styles.Bar1}></View>
          <View style={styles.Bar1}></View>
          <View style={styles.Bar1}></View>
          <View style={styles.Bar1}></View> */}
          <BarGraph/>
          <BarGraph/>
          <BarGraph/>
          <BarGraph/>
          <BarGraph/>
          <BarGraph/>
        </View>
        <View style={styles.listArea}>
          <View style={styles.listHead}>
            <Text style={styles.listDateValor}>Data</Text>
            <Text style={styles.listDateValor}>Descrição</Text>
            <Text style={styles.listDateValor}>Valor</Text>
          </View>
          <View style={styles.listItself}>
            <Lista/>
          </View>
        </View>
        <View style={styles.posiTO}>
          <TouchableOpacity style={styles.buttonPlus}>
            <View>
              <Text style={styles.buttonText}>+</Text>
            </View>
          </TouchableOpacity>
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
  listItself: {
    backgroundColor: 'white',
    height: '84%',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 5,
  },
  textoGrafico: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontFamily: 'NotoSans-Light',
  },
  listDateValor: {
    fontSize: 19,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'NotoSans-Light',
  },
  listHead: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  listArea: {
    backgroundColor: 'white',
    height: '40%',
    width: '90%',
    paddingTop: 30,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  avatarView: {
    backgroundColor: '#F7F9FA',
    textAlign: 'right',
    width: '57%',
    alignItems: 'flex-end',
  },
  buttonPlus: {
    backgroundColor: 'green',
    borderRadius: 100,
    width: 60,
    height: 60,
    bottom: 0,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  posiTO: {
    marginTop: 'auto',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    margin: 'auto',
  },
  currentCost: {
    backgroundColor: '#F7F9FA',
    width: '100%',
  },
  currentCostDesc: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontFamily: 'NotoSans-Light',
  },
  currentCostText: {
    fontFamily: 'NotoSans-Bold',
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
    marginRight: 15,
  },
  welcome1: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#F7F9FA',
    paddingLeft: 8,
  },
  welcome2: {
    fontSize: 32,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'NotoSans-Light',
  },
  chartArea: {
    height: 150,
    width: '90%',
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    paddingLeft: 9,
    borderRadius: 20,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  Bar1: {
    height: barHeight,
    width: 20,
    backgroundColor: '#F7F9FA',
    margin: 'auto',
    alignSelf: 'flex-end',
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
  },
  area1: {
    height: 200,
    width: 200,
    backgroundColor: '#F7F9FA',
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
    height: '30',
  },
  mainView: {
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#F7F9FA',
    height: '100%',
  },
});

export default SecondScreen;
