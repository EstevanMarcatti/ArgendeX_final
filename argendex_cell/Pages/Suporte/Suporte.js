import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Cards from './CompSuporte/Cards';
import PesqSup from './CompSuporte/PesqSup';

const Suporte = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShow = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleShow}>
        <Text style={styles.buttonText}>Suporte</Text>
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Suporte</Text>
          
          <View style={styles.pesqsup}>
            <Text style={styles.problemText}>Qual o seu problema???</Text>
            <PesqSup />
          </View>
          
          <View style={styles.cardsContainer}>
            <Cards />
          </View>
          
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pesqsup: {
    alignItems: 'center',
    marginBottom: 20,
  },
  problemText: {
    fontSize: 20,
    marginBottom: 10,
  },
  cardsContainer: {
    flex: 1,
    width: '100%',
  },
});

export default Suporte;
