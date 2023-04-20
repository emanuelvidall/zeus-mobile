import React from 'react';
import {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';

interface BarGraphProps {
  size: number;
}

const BarGraph: React.FC<BarGraphProps> = ({size}) => {

  const [animation] = useState(new Animated.Value(0));

//   useEffect(() => {
//   const timeoutId = setTimeout(() => {
//     setBarSize(size);
//   }, 2000);

//   return () => {
//     clearTimeout(timeoutId);
//   };
// }, [size]);

  useEffect(() => {
    Animated.timing(animation, {
        toValue: size * 4,
        duration: 1000,
        useNativeDriver: false,
    }).start();
  }, [size, animation]);


  const styles = StyleSheet.create({
    barra: {
        width: 30,
        backgroundColor: 'white',
        borderTopEndRadius: 7,
        borderTopStartRadius: 7,
    },
  });

  const barStyle = {
    height: animation,
    width: 30,
  };

  return (
    <View>
      <Animated.View style={[styles.barra, barStyle]}></Animated.View>
      <Text>{size}/Mes</Text>
    </View>
  );
};



export default BarGraph;
