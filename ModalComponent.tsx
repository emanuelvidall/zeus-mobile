import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import PegaData from './PegaData';
import PickerTipo from './PickerTipo';

interface ModalProps {
  visible: boolean;
  onSave: (descricao: string, data: string, tipo: string, quantidade: number, valor: number) => void;
  item: {};
  toggleModal: () => void;
  reloadTotal: () => void;
  reload: boolean;
  setReload: (reload: boolean) => void;
  reloadData: () => void
}

export const myIp = '10.50.188.123'

export const MyModal: React.FC<ModalProps> = ({ visible, item, toggleModal, reloadTotal, reload, setReload, reloadData }) => {
  const [desc, setDesc] = useState('');
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  
  const handleDataChange = (date) => {
    const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    console.log('data aqui!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', formattedDate)
    setData(formattedDate.replace(/\//g, '-'))
}

  const dados = {desc, data, tipo, valor, quantidade}
  const url = '/novocusto';


function postData(url, dados) {
    
    if (!dados.desc || !dados.data || !dados.tipo || !dados.valor || !dados.quantidade) {
    return;
    }
    return fetch(`http://${myIp}:3001${url}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => {response.json()
        Alert.alert('Despesa adicionada!')
        setDesc('');
        setData('')
        setTipo('')
        setQuantidade(0)
        setValor(0)
        toggleModal()
        reloadTotal()
        reloadData()
        })
        .catch(error => {
        console.error(error);
        });
    }

  const styles = StyleSheet.create({  
    buttonPlus: {
    backgroundColor: '#5390D9',
    borderRadius: 100,
    width: 60,
    height: 60,
    bottom: 0,
    marginBottom: 3,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    modalButton: {
      backgroundColor: '#475569',
      padding: 10,
      borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'ReadexPro-Medium',
  },
  inputs: {
    width: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderColor: '#e5e7eb',
    borderWidth: 2,
    height: 30,
    padding: 6,
  },
  modalStyle: {
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    display: 'flex',
  },
  inputDesc: {
    fontFamily: 'ReadexPro-Medium',
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 60,
    textAlign: 'left',
  },
  inputContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: '83%',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 10,
    padding: 15,
  }
})

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalStyle}>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 20, marginBottom: 20, fontFamily: 'ReadexPro-Medium', color: 'black'}}>Adicione uma nova despesa 💸 </Text>
          <Text style={styles.inputDesc}>Descrição</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Descricao"
            value={desc}
            onChangeText={setDesc}
          />
          <Text style={styles.inputDesc}>Data (DD-MM-AA)</Text>
          <PegaData onChange={handleDataChange}/>
          <Text style={styles.inputDesc}>Tipo</Text>
          <View style={{width: 200, height: 50}}>
            <PickerTipo onChange={setTipo}/>
          </View>
          <Text style={styles.inputDesc}>Quantidade</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Quantidade"
            keyboardType="numeric"
            value={quantidade.toString()}
            onChangeText={(text) => setQuantidade(parseInt(text))}
          />
          <Text style={styles.inputDesc}>Valor R$</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Valor"
            keyboardType="numeric"
            value={valor.toString()}
            onChangeText={(text) => setValor(parseFloat(text))}
          />
          <TouchableOpacity onPress={() => {
  if (desc) {
    postData(url, dados)
  } else {
    Alert.alert('Por favor, preencha todos os campos.')
  }
}} style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 }}>
              <Text style={{ color: 'white', fontFamily: 'ReadexPro-Medium', fontSize: 16, }}>Adicionar</Text>
            </TouchableOpacity>
          <View style={{backgroundColor: 'transparent', width: '65%', marginTop: 25, }}>
            <TouchableOpacity style={styles.modalButton} onPress={() => toggleModal()}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </Modal>
  );
};
