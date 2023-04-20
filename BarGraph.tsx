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
        width: 30,
        backgroundColor: '#5390D9',
        borderTopEndRadius: 7,
        borderTopStartRadius: 7,
        marginLeft: 10,
    },
    labels: {
        marginRight: 10,
    },
  });

  const barStyle = {
    height: animation,
    width: 30,
  };

  return (
    <View>
      <Animated.View style={[styles.barra, barStyle]}></Animated.View>
      <Text style={styles.labels}>{size}/Abril</Text>
    </View>
  );
};



export default BarGraph;
