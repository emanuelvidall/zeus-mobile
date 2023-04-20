import React from 'react';
import {Text, View, FlatList, StyleSheet, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import moment from 'moment';

interface ListItem {
  id: string;
  preco: number;
  date: string;
  desc: string;
}


interface ListaProps {}

export const Lista: React.FC<ListaProps> = () => {
    const [data, setData] = useState<ListItem[]>([]);

    useEffect(() => {
        fetch('http://10.50.63.108:3001/todoscustos')
        .then((response) => response.json())
        .then((json) => {
            const sortedData = json.sort((a, b) => {
                const dateA = moment(a.date, 'DD-MM-YYYY').toDate();
                const dateB = moment(b.date, 'DD-MM-YYYY').toDate();
                return dateA - dateB;
            });
            setData(sortedData.reverse());
        })
        .catch((error) => console.error('ocorreu um erro', error));
    }, []);

    const onPressItem = (item: ListItem) => {
    console.log('Pressed item:', item);
  };

  const renderItem = ({item}: { item: ListItem}) => {
    return (
        <TouchableOpacity onPress={() => onPressItem(item)}>
            <View style={styles.lista}>
                <Text>{item.date}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text>R${item.preco}</Text>
            </View>
            <View>
                <View style={styles.separator}></View>
            </View>
        </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    lista: {
        backgroundColor: 'red',
        marginBottom: 5,
        fontSize: 35,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        height: 60,
    },
    desc: {
        marginRight: 20,
    },
    separator: {
        alignSelf: 'center',
        width: '88%',
        height: 2,
        marginBottom: 3,
        backgroundColor: 'grey',
        opacity: 0.2,
    },
  });

  return (
    <ScrollView>
        <FlatList data={data} renderItem={renderItem}/>
    </ScrollView>
  );
};
