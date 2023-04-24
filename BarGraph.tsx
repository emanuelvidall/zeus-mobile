import React from 'react';
import {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import moment from 'moment';

const BarGraph = () => {

  const [data, setData] = useState([]);
  const [numViews, setNumViews] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState({});

  useEffect(() => {
        fetch('http://10.50.188.76:3001/todoscustos')
        .then((response) => response.json())
        .then((json) => {
            const sortedData = json.sort((a, b) => {
                const dateA = moment(a.date, 'DD-MM-YYYY').toDate();
                const dateB = moment(b.date, 'DD-MM-YYYY').toDate();
                return dateA - dateB;
            });
            const newData = sortedData.reverse().slice(-6).filter((item, index, self) => self.findIndex(i => i.id === item.id) === index);
            setData(newData);
            setNumViews(newData.length);

            const totals = {};
            for (const item of json) {
              const month = item.month;
              const price = parseFloat(item.preco);
              if (totals[month]){
                totals[month] += price;
              } else {
                totals[month] = price;
              }
            }
            setMonthlyTotals(totals);
        })
        .catch((error) => console.error('ocorreu um erro', error));
    }, []);

  const [animation] = useState(new Animated.Value(0));

  const size = 100;

  useEffect(() => {
    Animated.timing(animation, {
        toValue: size / 4,
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
        maxHeight: 100,
        alignSelf: 'center',
        marginRight: 8,
    },
    container: {
      backgroundColor: 'green',
      flexDirection: 'column',
    },
    labels: {
      flexDirection: 'column',
      textAlign: 'center',
      fontSize: 10,
      fontFamily: 'ReadexPro-Regular',
    },
    graftot: {
      backgroundColor: 'green',
      flexDirection: 'row',
      maxWidth: '100%',
    },
  });

    return (
    <View style={styles.graftot}>
      {data.slice(-numViews).map((item, index) => {
        if (index >= 6) {
          return null;
        }
        const total = monthlyTotals[item.month] || 0;
        console.log('render: ', item);
        return <View key={item.id}
            style={[styles.barra, { height: total }]}></View>;
      })}
      {Object.entries(monthlyTotals).map(([month, total]) => (
        <>
        <View>
          <View key={month} style={[styles.barra, { height: total }]}>
          </View>
          <View>
            <Text>{`Month: ${month}`}</Text>
            <Text>{`Total: ${total.toFixed(2)}`}</Text>
          </View>
        </View>
        </>
      ))}
    </View>
  );
};

export default BarGraph;
