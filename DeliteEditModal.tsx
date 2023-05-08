import React, {useState} from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';
import { myIp } from './AddModal';
import { TextInput } from 'react-native-gesture-handler';

interface MyModalProps {
  visible: boolean;
  toggleModal: (valor: number, data: string, desc: string, tipo: string, _id: string, quantidade: number) => void;
  valor: number;
  desc: string;
  data: string;
  tipo: string;
  _id: string;
  quantidade: number;
  reloadData: () => void
  reloadTotal: () => void
}

const DeleteEditModal: React.FC<MyModalProps> = ({ visible, toggleModal, valor, data, tipo, desc, _id, reloadData, reloadTotal, quantidade }) => {

  const [newDesc, setNewDesc] = useState<string>('');
  const [newValor, setNewValor] = useState<number>(0);
  const [newTipo, setNewTipo] = useState<string>('');
  const [newQuant, setNewQuant] = useState<number>(0);
  const [newData, setNewData] = useState<string>('');

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
        reloadTotal()
    })
    .catch((error) => {
        // handle error
        console.error(error);
    });
}

function handleSave() {

  const updatedDados = {
    desc: newDesc === '' ? desc : newDesc,
    valor: newValor === 0 ? valor : newValor,
    tipo: newTipo === '' ? tipo : newTipo,
    quantidade: newQuant === 0 ? quantidade : newQuant,
    data: newData === '' ? data : newData,
  };

  return fetch(`http://${myIp}:3001/todoscustos/editar/${_id}`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedDados)
  })
      .then(response => {response.json()
      Alert.alert('Despesa editada!')
      setNewDesc('');
      setNewValor(0)
      setNewTipo('')
      setNewQuant(0)
      setNewData('')
      toggleModal()
      reloadTotal()
      reloadData()
      })
      .catch(error => {
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
            <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium', fontSize: 16, textAlign: 'center', marginBottom: 5}}>Edite sua despesa 📝</Text>
            <View>
              <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium'}}>Descricao</Text>
                <TextInput style={styles.editInputs} placeholder={desc}
                onChangeText={setNewDesc}/>
                <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium'}}>Valor</Text>
                <TextInput style={styles.editInputs} placeholder={valor.toString()}
                onChangeText={(text) => setNewValor(parseInt(text))}/>
                <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium'}}>Tipo</Text>
                <TextInput style={styles.editInputs} placeholder={tipo}
                onChangeText={setNewTipo}/>
                <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium'}}>Quantidade</Text>
                <TextInput style={styles.editInputs} placeholder={quantidade.toString()}
                onChangeText={(text) => setNewQuant(parseInt(text))}/>
                <Text style={{color: 'black', fontFamily: 'ReadexPro-Medium'}}>Data</Text>
                <TextInput style={styles.editInputs} placeholder={data}
                onChangeText={setNewData}/>
            </View>
          </View>
          <View style={styles.opcoes}>
            <TouchableOpacity style={[styles.button, styles.editar]} onPress={handleSave}>
              <FontAwesomeIcon icon={faPenToSquare} style={styles.buttonText}/>
              <Text style={{color: 'white', fontFamily: 'ReadexPro-Medium', fontSize: 12}}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.excluir]} onPress={handleDelete}> 
            <FontAwesomeIcon icon={faTrashCan} style={styles.buttonText}/>
            <Text style={{color: 'white', fontFamily: 'ReadexPro-Medium', fontSize: 12}}>Excluir</Text>
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
    height: 450,
    width: '66%',
    borderRadius:10,
    marginBottom: 'auto',
    marginTop: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
  },
  editInputs: {
    width: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderColor: '#e5e7eb',
    borderWidth: 2,
    height: 30,
    padding: 6,
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
    shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
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
    width: 115,
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
