import React, { useRef } from 'react';
import {Text, FlatList, StyleSheet, ScrollView, Pressable, View, Alert, TouchableOpacity, Modal, PanResponder} from 'react-native';
import {useState, useEffect} from 'react';
import moment from 'moment';
import { myIp } from './ModalComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStethoscope, faBowlRice, faCartShopping, faShower, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import DeleteEditModal from './DeliteEditModal';


interface ListItem {
  _id: string;
  data: string;
  desc: string;
  valor: number;
  tipo: string;
  quantidade: number
}


interface ListaProps {
  reloadTotal: () => void
  reload: boolean;
  setReload: (reload: boolean) => void;
}

export const Lista: React.FC<ListaProps> = ({ reloadTotal, reload, setReload }) => {
    const [data, setData] = useState<ListItem[]>([]);
    const [editModal, setEditModal] = useState(false);
    const [selectedValor, setSelectedValor] = useState<number>(0);
    const [selectedDesc, setSelectedDesc] = useState<string>('');
    const [selectedData, setSelectedData] = useState<string>('');
    const [selectedTipo, setSelectedTipo] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [selectedQuant, setSelectedQuant] = useState<number>(0);

    const toggleModal = (valor: number, data: string, desc: string, tipo: string, _id: string, quantidade: number) => {
      setEditModal(!editModal);
      setSelectedValor(valor);
      setSelectedData(data);
      setSelectedDesc(desc);
      setSelectedTipo(tipo);
      setSelectedItem(_id);
      setSelectedQuant(quantidade);
    };

    const fetchData = () => {
      fetch(`http://${myIp}:3001/todoscustos`)
        .then((response) => response.json())
        .then((json) => {
          const sortedData = json.sort((a: Date, b: Date) => {
            const dateA = moment(a.data, 'DD-MM-YYYY').toDate();
            const dateB = moment(b.data, 'DD-MM-YYYY').toDate();
            return dateA - dateB;
          });
          setData(sortedData.slice(-10).reverse());
        })
        .catch((error) => console.error('ocorreu um erro', error));
    };
    
    useEffect(() => {
      fetchData();
      setReload(false)
    }, [reload]);
    

    const renderItem = ({ item }: { item: ListItem }) => {

      return (
        <View>
            <View key={item._id}>
              <TouchableOpacity onPress={() => toggleModal(item.valor, item.data, item.desc, item.tipo, item._id, item.quantidade)}>
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
                </View>
              </TouchableOpacity>
              <View style={styles.separador}></View>
              {editModal && (
                  <DeleteEditModal
                      visible={editModal}
                      toggleModal={toggleModal}
                      valor={selectedValor}
                      data={selectedData}
                      tipo={selectedTipo}
                      desc={selectedDesc}
                      _id={selectedItem}
                      reloadData={fetchData}
                      reloadTotal={reloadTotal}
                      quantidade={selectedQuant}
                  />
              )}
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
