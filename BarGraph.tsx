import React from 'react';
import {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';

interface rawData {
  preco: number;
  month: number;
}

const BarGraph = () => {

  const [animation] = useState(new Animated.Value(0));

  const size = 30;

  useEffect(() => {
    Animated.timing(animation, {
        toValue: size * 2,
        duration: 1000,
        useNativeDriver: false,
    }).start();
  }, [size, animation]);

  const styles = StyleSheet.create({
    barra: {
        width: 10,
        backgroundColor: '#5390D9',
        borderTopEndRadius: 7,
        borderTopStartRadius: 7,
        marginLeft: 10,
        position: 'absolute',
        top: 55.32,
        left: 22.3,
    },
    labels: {
        marginRight: 10,
        fontFamily: 'ReadexPro-Regular',
        color: 'grey',
        borderRadius: 10,
    },
    labelscont: {
      marginTop: 1,
      alignItems: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 10,
      height: 19,
    },
  });

  const barStyle = {
    height: animation,
  };

  return (
    <>
      <Animated.View style={[styles.barra, barStyle]}></Animated.View>
      <View style={styles.labelscont}>
        <Text style={styles.labels}>{size}/Abril</Text>
      </View>
    </>
  );
};



export default BarGraph;
