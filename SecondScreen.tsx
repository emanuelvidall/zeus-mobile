import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Lista} from './ListItems';
import CurrentDate from './CurrentDate';
import { myIp } from './AddModal';
import ChartVic from './ChartVic';


interface Cost {
  _id: string;
  valor: number;
  quantidade: number;
  tipo: string;
  desc: string;
}

function SecondScreen() {
  const [totalcustos, setTotalCustos] = useState<Number>(0);
  const [reload, setReload] = useState(false);

  const getTotalCosts = async () => {
    try {
      const response = await fetch(`http://${myIp}:3001/todoscustos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
      console.log('Success GET');
      const result = await response.json();
      const precoArray: number[] = result.map((obj: Cost) => obj.valor);
      const total: number = precoArray.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,0);
      setTotalCustos(total);
      // console.log('Elements: ', result);
      // // setUsuarios(result);
      // // setDataFetched(true);
      // console.log('total dos custos', total);
    } catch (error) {
      console.error('Error:', error);
      console.log('cannot GET');
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
    getTotalCosts();
  }, 3000);
  return () => {
    clearInterval(intervalId);
  };
}, []);

  return (
    <>
      <View style={styles.mainView}>
        <View style={styles.welcome1}>
          <CurrentDate />
        </View>
        <View style={styles.topSec}>
          <View style={styles.dog1}>  
            <Image source={require('./src/dog1.png')} style={styles.dogavatar}></Image>
          </View>
          <View style={styles.nomeTopSec}>
          <Text>Zeus</Text>
        </View>
        </View>
        <View style={styles.currentCost}>
          <Text style={styles.currentCostDesc}>
            <Text>Seu gasto total foi:</Text>
          </Text>
          <Text style={styles.currentCostText}>R$ {totalcustos.toFixed(2)}</Text>
        </View>
        <View>
          <Text style={styles.textoGrafico}>Histórico de Auspesas</Text>
        </View>
        <View style={styles.chartArea}>
          <ChartVic />
        </View>
        <View style={styles.listArea}>
          <Text style={styles.transacoes}>Transaçoes Recentes</Text>
          <View style={styles.listItself}>
            <Lista renderFirstOnly={true} reloadTotal={getTotalCosts} reload={reload} setReload={setReload}/>
          </View>
        </View>
        <View style={styles.posiTO}>
        </View>
      </View>
    </>
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
  nomeTopSec: {
    position: 'absolute',
    bottom: -8,
    left: 12.5,
  },
  topSec: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 0,
    marginRight: 10,
    zIndex: 10,
    marginTop: 10,
  },
  dog1Nome: {
    color: 'white',
    fontFamily: 'ReadexPro-Medium',
    fontSize: 32,
    marginBottom: 'auto',
  },
  dog1Peso: {
    color: 'white',
    fontFamily: 'ReadexPro-Regular',
    fontSize: 12,
    marginLeft: 105,
  },
  dog1Idade: {
    color: 'white',
    fontFamily: 'ReadexPro-Regular',
    fontSize: 12,
    marginLeft: 105,
  },
  dog1Desc: {
    color: 'white',
    fontFamily: 'ReadexPro-Regular',
    fontSize: 10,
  },
  dog1: {
    backgroundColor: '#1D2A30',
    width: 60,
    height: 60,
    borderRadius: 100,
    flexDirection: 'row',
    display: 'flex',
    padding: 10,
    marginBottom: 10,
    zIndex: 10,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  dog1Foto: {
    backgroundColor: '#28343c',
    borderRadius: 10,
    width: '30%',
  },
  dogavatar: {
    width: 55,
    height: 55,
    borderRadius: 100,
    alignSelf: 'center',
    marginLeft: 2,
    position: 'absolute',
  },
  transacoes: {
    fontFamily: 'ReadexPro-Medium',
    color: '#00160A',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  chartArea2: {
    position: 'relative',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingRight: 9,
    maxHeight: '100%',
  },
  barraBody: {
    width: 10,
    backgroundColor: 'grey',
    borderTopEndRadius: 7,
    borderTopStartRadius: 7,
    marginLeft: 10,
    height: '100%',
  },
  listItself: {
    backgroundColor: '#F6F6F6',
    height: '84%',
    width: '100%',
    alignItems: 'center',
  },
  textoGrafico: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontFamily: 'ReadexPro-Medium',
    color: '#00160A',
    marginBottom: 5,
  },
  listDateValor: {
    fontSize: 19,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'ReadexPro-Regular',
  },
  listArea: {
    backgroundColor: '#F6F6F6',
    height: '40%',
    width: '90%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
  },
  avatarView: {
    backgroundColor: '#F6F6F6',
    textAlign: 'right',
    width: '57%',
    alignItems: 'flex-end',
  },
  buttonPlus: {
    backgroundColor: '#5390D9',
    borderRadius: 100,
    width: 60,
    height: 60,
    bottom: 0,
    marginBottom: 3,
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
    borderRadius: 100,
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    margin: 'auto',
  },
  currentCost: {
    backgroundColor: '#F6F6F6',
    width: '100%',
    marginBottom: 10,
  },
  currentCostDesc: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontFamily: 'ReadexPro-Medium',
    color: '#00160A',
    marginLeft: 9,
    marginBottom: 10,
    marginTop: 10,
  },
  currentCostText: {
    fontFamily: 'ReadexPro-Medium',
    fontSize: 45,
    alignSelf: 'center',
    color: '#1D2A30',
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
    backgroundColor: '#F6F6F6',
    paddingLeft: 8,
    marginBottom: 10,
    marginTop: 22,
  },
  welcome2: {
    fontSize: 32,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'ReadexPro-Regular',
  },
  chartArea: {
    height: '25.8%',
    width: '80%',
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingLeft: 10,
    borderRadius: 20,
    paddingBottom: 25,
    paddingRight: 10,
  },
  area1: {
    height: 200,
    width: 200,
    backgroundColor: '#F6F6F6',
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
    backgroundColor: '#F6F6F6',
    height: '100%',
    flex: 1,
    position: 'relative',
  },
});

export default SecondScreen;
