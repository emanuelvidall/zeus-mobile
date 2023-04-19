import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface BarGraphProps {
  size: number;
}

const BarGraph: React.FC<BarGraphProps> = ({size}) => {
  const tamanho = size * 8;

  const styles = StyleSheet.create({
    barra: {
        height: tamanho,
        width: 30,
        backgroundColor: 'white',
        borderTopEndRadius: 7,
        borderTopStartRadius: 7,
    },
  });

  return (
    <View>
      <View style={styles.barra}></View>
      <Text>{tamanho}/Mes</Text>
    </View>
  );
};



export default BarGraph;
