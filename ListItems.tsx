import React from 'react';
import {Text, FlatList, StyleSheet, ScrollView, Pressable} from 'react-native';
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
        fetch('http://192.168.31.96:3001/todoscustos')
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

  const renderItem = ({item}: {item: ListItem}) => {
    return (
        <Pressable style={styles.lista} onPress={() => onPressItem(item)}>
            <Text>{item.date}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <Text>R${item.preco}</Text>
        </Pressable>
    );
  };

  const styles = StyleSheet.create({
    lista: {
        backgroundColor: 'white',
        fontSize: 35,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        marginBottom: 30,
        alignItems: 'flex-end',
        paddingBottom: 20,
        width: '100%',
        borderRadius: 20,
        paddingRight: 20,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
    },
    desc: {
        marginRight: 30,
        textAlign: 'center',
    },
  });

  return (
    <ScrollView horizontal={true}>
        <FlatList data={data} renderItem={renderItem}/>
    </ScrollView>
  );
};
