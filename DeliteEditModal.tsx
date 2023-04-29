import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface MyModalProps {
  visible: boolean;
  onClose: () => void;
}

const DeleteEditModal: React.FC<MyModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Button 1 pressed')}>
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.button} onPress={() => console.log('Button 2 pressed')}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 250,
    width: '50%',
    borderRadius:10,
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  button: {
    width: 150,
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
  separator: {
    height: 10,
    width: '100%',
  },
});

export default DeleteEditModal;
