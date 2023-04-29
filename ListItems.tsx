import React, { useRef } from 'react';
import {Text, FlatList, StyleSheet, ScrollView, Pressable, View, Alert, TouchableOpacity, Modal, PanResponder} from 'react-native';
import {useState, useEffect} from 'react';
import moment from 'moment';
import { myIp } from './ModalComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStethoscope, faBowlRice, faCartShopping, faShower, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import DeleteEditModal from './DeliteEditModal';


interface ListItem {
  id: string;
  preco: number;
  data: string;
  desc: string;
}


interface ListaProps {}

export const Lista: React.FC<ListaProps> = () => {
    const [data, setData] = useState<ListItem[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [slidePosition, setSlidePosition] = useState(0);

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
          Math.abs(gestureState.dx) > 5,
        onPanResponderMove: (evt, gestureState) => {
          console.log('mexeu')
          Alert.alert('mesolta')
          setSlidePosition(gestureState.dx);  
        },
        onPanResponderRelease: (evt, gestureState) => {
          console.log('soltou')
          Alert.alert('ufasoltou')
          setSlidePosition(0);
        },
      })
    ).current;
    
    

    useEffect(() => {
        fetch(`http://${myIp}:3001/todoscustos`)
        .then((response) => response.json())
        .then((json) => {
            const sortedData = json.sort((a, b) => {
                const dateA = moment(a.data, 'DD-MM-YYYY').toDate();
                const dateB = moment(b.data, 'DD-MM-YYYY').toDate();
                return dateA - dateB;
            });
            setData(sortedData.slice(-10).reverse());
        })
        .catch((error) => console.error('ocorreu um erro', error));
    }, []);

    const renderItem = ({ item }: { item: ListItem }) => {
      const handleLongPress = () => {
        setModalVisible(true);
      };
    
      const handleModalClose = () => {
        setModalVisible(false);
      };
    
      return (
        <View>
            <View key={item._id}>
              <TouchableOpacity
                onPress={() => Alert.alert('oi')}
                {...panResponder.panHandlers}
              >
                <View style={styles.lista}>
                  <View style={styles.foto}>
                    {item.tipo == 'racao' ? (
                      <View
                        style={{
                          backgroundColor: '#DC3434',
                          width: 40,
                          height: 40,
                          borderRadius: 24,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ color: 'white', fontSize: 24 }}
                          icon={faBowlRice}
                        />
                      </View>
                    ) : item.tipo == 'banho' ? (
                      <View
                        style={{
                          backgroundColor: '#32A7E2',
                          width: 40,
                          height: 40,
                          borderRadius: 24,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ color: 'white', fontSize: 24 }}
                          icon={faShower}
                        />
                      </View>
                    ) : item.tipo == 'shop' ? (
                      <View
                        style={{
                          backgroundColor: '#4BA83D',
                          width: 40,
                          height: 40,
                          borderRadius: 24,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ color: 'white', fontSize: 24 }}
                          icon={faCartShopping}
                        />
                      </View>
                    ) : item.tipo == 'clinica' ? (
                      <View
                        style={{
                          backgroundColor: '#B548C6',
                          width: 40,
                          height: 40,
                          borderRadius: 24,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ color: 'white', fontSize: 24 }}
                          icon={faStethoscope}
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.right}>
                    <View style={styles.descdate}>
                      <Text style={styles.desc}>{item.desc}</Text>
                      <Text style={styles.date}>{item.data}</Text>
                    </View>
                    <View style={styles.precoView}>
                      <Text style={styles.preco}>
                        R${item.valor.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  {slidePosition < 0 && (
                    <TouchableOpacity
                      style={{ backgroundColor: 'green', width: 30, height: 30 }}
                      onPress={handleDelete}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={styles.deleteIcon}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.separador}></View>
            </View>
        </View>
      );
    };
    

  const styles = StyleSheet.create({
    lista: {
        backgroundColor: 'white',
        fontSize: 35,
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        marginBottom: 0,
        width: 300,
        borderRadius: 10,
        paddingTop: 5,
        paddingRight: 5,
    },
    separador: {
      backgroundColor: 'transparent',
      height: 30,
      width: '100%',
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
