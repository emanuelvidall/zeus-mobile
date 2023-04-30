import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';

interface MyModalProps {
  visible: boolean;
  toggleModal: () => void;
  valor: number;
  desc: string;
  data: string;
  tipo: string;
}

const DeleteEditModal: React.FC<MyModalProps> = ({ visible, toggleModal, valor, data, tipo, desc }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
      <TouchableOpacity style={[styles.buttonClose]} onPress={() => toggleModal()}>
        <FontAwesomeIcon icon={faX} style={styles.iconClose}/>
        </TouchableOpacity>
        <Text style={{color: 'white'}}>Desc: {desc}</Text>
        <Text style={{color: 'white'}}>valor: {valor}</Text>
        <Text style={{color: 'white'}}>Data: {data}</Text>
        <Text style={{color: 'white'}}>Tipo: {tipo}</Text>
        <View style={styles.opcoes}>
          <TouchableOpacity style={[styles.button, styles.editar]} onPress={() => Alert.alert('Button 1 pressed')}>
            <FontAwesomeIcon icon={faPenToSquare} style={styles.buttonText}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.excluir]} onPress={() => Alert.alert('Button 2 pressed')}>
          <FontAwesomeIcon icon={faTrashCan} style={styles.buttonText}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'black',
    height: 250,
    width: '50%',
    borderRadius:10,
    marginBottom: 'auto',
    marginTop: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  iconClose: {
    color: 'white',
  },
  excluir: {
    backgroundColor: 'red',
  },
  editar: {
    backgroundColor: 'orange',
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
