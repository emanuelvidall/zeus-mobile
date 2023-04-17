import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

//using android 6.0 marshmallow on android studio under sdk platforms
//on sdktools android sdk build tools 34 rc3, android command line tools sdk (latest) android emulator 32.1.12 android platform tools 34.0.1

const FirstScreen = ({navigation}) => {
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
    <>
      <StatusBar hidden />
      <View
        style={{
          flexDirection: 'column',
          height: windowHeight,
          width: windowWidth,
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 10,
          flex: 1,
        }}>
        <View style={styles.welcome}>
          <Text style={styles.title}>Bem-vindo de volta! 👋</Text>
          <Text style={styles.subtitle}>Cuide bem do seu pet.</Text>
        </View>
        <View style={styles.logon}>
          <View style={styles.shadowProp}>
            <Image style={styles.login} source={require('./src/zeuslogo.png')} />
          </View>
          {/* <Text style={styles.loginText}>Nome</Text>
          <TextInput style={styles.input} />
          <Text style={styles.loginText}>Senha</Text>
          <TextInput style={styles.input} /> */}
          <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('SecondScreen')}>
            <Text style={styles.toTextStyle}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.creditos}>
          Desenvolvido por Emanuel Vidal @ Vortex UNIFOR 2023
        </Text>
      </View>
    </>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  logo: {
    width: 64,
    height: 64,
    marginLeft: 10,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '800',
    alignSelf: 'flex-start',
  },
  logon: {
    alignSelf: 'center',
    marginTop: windowHeight / 6,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 'auto',
    width: 0.888 * windowWidth,
  },
  title: {
    fontWeight: '700',
    fontSize: 30,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 15,
    opacity: 0.5,
  },
  login: {
    width: 130,
    height: 130,
    borderRadius: 15,
    marginBottom: 20,
  },
  welcome: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 30,
    marginLeft: 15,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  creditos: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 'auto',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#d8d8d8',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#16a83d',
    borderRadius: 5,
    padding: 8,
    width: 0.488 * windowWidth,
    marginTop: 30,
  },
  toTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default FirstScreen;
