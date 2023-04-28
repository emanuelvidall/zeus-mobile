import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import PickDate from './DatePicker';

export const myIp = '10.50.188.123';

const ModalComponent = ({ visible, toggleModal }) => {
  return (
    <Modal style={{borderRadius: 10}}visible={visible} transparent={true} onRequestClose={toggleModal}>
        <View style={styles.modalView}>
          <Text>Gasto</Text>
          <TextInput
        style={styles.input}
        placeholder='Descricao do gasto'
      />
      <Text>Valor</Text>
      <TextInput placeholder='R$ valor'
        style={styles.input}
      />
      <PickDate />
          <Pressable onPress={toggleModal}>
            <Text>Close Modal</Text>
          </Pressable>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: 500,
    width: 350,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16.0,
    elevation: 24,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 150,
  },
});

export default ModalComponent;
