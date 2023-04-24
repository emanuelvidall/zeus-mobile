import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import PickDate from './DatePicker';

const ModalComponent = ({ visible, toggleModal }) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={toggleModal}>
        <View style={styles.modalView}>
          <Text>Hello World!</Text>
          <TextInput
        style={styles.input}
      />
      <TextInput
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ModalComponent;
