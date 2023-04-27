import React from 'react';
import {Text, FlatList, StyleSheet, ScrollView, Pressable, View} from 'react-native';
import {useState, useEffect} from 'react';
import moment from 'moment';
import ModalComponent from './ModalComponent';

interface ListItem {
  id: string;
  preco: number;
  date: string;
  desc: string;
}


interface ListaProps {}

export const Lista: React.FC<ListaProps> = () => {
    const [data, setData] = useState<ListItem[]>([]);

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

    useEffect(() => {
        fetch('http://10.50.188.123:3001/todoscustos')
        .then((response) => response.json())
        .then((json) => {
            const sortedData = json.sort((a, b) => {
                const dateA = moment(a.data, 'DD-MM-YYYY').toDate();
                const dateB = moment(b.data, 'DD-MM-YYYY').toDate();
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
      <>
          <Pressable  onPress={() => toggleModal()}>
              <View style={styles.lista} >
                <View style={styles.foto}></View>
                <View style={styles.right}>
                  <View style={styles.descdate}>
                    <Text style={styles.desc}>{item.desc}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                  <View style={styles.precoView}>
                    <Text style={styles.preco}>R${item.valor.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
          </Pressable>
      <ModalComponent visible={modalVisible} toggleModal={toggleModal} />
      </>
    );
  };

  const styles = StyleSheet.create({
    lista: {
        backgroundColor: 'white',
        fontSize: 35,
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        marginBottom: 30,
        width: 300,
        borderRadius: 20,
        paddingTop: 5,
        paddingRight: 5,
    },
    right: {
      backgroundColor: 'white',
      minWidth: '75%',
      borderRadius: 10,
      flexDirection: 'row',
    },
    date: {
      fontFamily: 'ReadexPro-Regular',
      color: '#979797',
    },
    foto: {
      width: 40,
      height: 40,
      backgroundColor: 'grey',
      borderRadius: 10,
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 10,
      marginTop: 5,
    },
    desc: {
        marginRight: 30,
        fontFamily: 'ReadexPro-Medium',
        color: '#000000',
    },
    preco: {
      fontFamily: 'ReadexPro-Medium',
      color: '#1D2A30',
    },
    precoView: {
      backgroundColor: 'white',
      marginLeft: 'auto',
      verticalAlign: 'middle',
      borderRadius: 10,
    },
  });

  return (
    <ScrollView horizontal={true}>
        <FlatList data={data} renderItem={renderItem}/>
    </ScrollView>
  );
};
