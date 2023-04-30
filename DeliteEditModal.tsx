import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrashCan, faX, faStethoscope, faShower, faBowlRice, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { myIp } from './ModalComponent';

interface MyModalProps {
  visible: boolean;
  toggleModal: () => void;
  valor: number;
  desc: string;
  data: string;
  tipo: string;
  _id: string;
  reloadData: () => void
}

const DeleteEditModal: React.FC<MyModalProps> = ({ visible, toggleModal, valor, data, tipo, desc, _id, reloadData }) => {

  const handleDelete = () => {
    fetch(`http://${myIp}:3001/costs/${_id}`, {
    method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => {
        // handle success
        console.log(data);
        Alert.alert('item deletado!', _id)
        toggleModal()
        reloadData()
    })
    .catch((error) => {
        // handle error
        console.error(error);
    });
}


  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={{flex: 1, width: '100%', height:'100%'}}>
        <View style={{backgroundColor:'#1D2A30', flex: 1, height: '100%', width: '100%', opacity: 0.22, position: 'absolute', zIndex: 0,}}></View>
        <View style={styles.container}>
        <TouchableOpacity style={[styles.buttonClose]} onPress={() => toggleModal()}>
          <FontAwesomeIcon icon={faX} style={styles.iconClose}/>
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
          <View>
            {tipo == 'racao' ? (
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
                    ) : tipo == 'banho' ? (
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
                    ) : tipo == 'shop' ? (
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
                    ) : tipo == 'clinica' ? (
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
            <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium'}}>Descrição: {desc}</Text>
            <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium'}}>Valor: R$ {valor}</Text>
            <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium'}}>Tipo: {tipo}</Text>
            <Text style={{color: 'black', opacity: 0.5}}>Data: {data}</Text>
            <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium'}}>{_id}</Text>
          </View>
          <View style={styles.opcoes}>
            <TouchableOpacity style={[styles.button, styles.editar]} onPress={() => Alert.alert('Button 1 pressed')}>
              <FontAwesomeIcon icon={faPenToSquare} style={styles.buttonText}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.excluir]} onPress={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} style={styles.buttonText}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingTop: 30,
    height: 250,
    width: '66%',
    borderRadius:10,
    marginBottom: 'auto',
    marginTop: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  opcoes: {
    flexDirection: 'row',
    bottom: 0,
    marginTop: 20,
  },
  buttonClose: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
  },
  iconClose: {
    color: 'white',
  },
  excluir: {
    backgroundColor: 'red',
    marginLeft: 10,
  },
  editar: {
    backgroundColor: 'orange',
    marginRight: 10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteEditModal;
