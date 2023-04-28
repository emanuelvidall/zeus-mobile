import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface MyModalProps {
  visible: boolean;
  onClose: () => void;
}

const DeleteEditModal: React.FC<MyModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade">
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
