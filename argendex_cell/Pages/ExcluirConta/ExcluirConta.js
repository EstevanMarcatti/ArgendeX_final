import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ExcluirConta = () => {
    const navigation = useNavigation();

    const excluirConta = async () => {
        try {
            const userId = await AsyncStorage.getItem('userID'); // Recupera o ID do AsyncStorage

            if (userId) {
                // Fazer a requisição DELETE para excluir a conta
                const response = await fetch(`http://10.135.60.15:8085/delete_usuario/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    Alert.alert('Sucesso', result.mensagem || 'Conta excluída com sucesso.');
                    await AsyncStorage.removeItem('userID'); // Remove o ID do AsyncStorage
                    navigation.navigate('Login'); // Volta para a tela inicial
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.erro || 'Erro ao excluir conta.');
                }
            } else {
                Alert.alert('Erro', 'ID do usuário não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
            Alert.alert('Erro', 'Erro ao excluir conta. Verifique a conexão ou tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Apagar Conta</Text>
            <Text style={styles.warning}>
                Tem certeza que deseja apagar sua conta? <Text style={styles.bold}>Não será possível recuperá-la!</Text>
            </Text>
            <Button title="Excluir Conta" onPress={excluirConta} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    warning: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    bold: {
        fontWeight: 'bold',
        color: 'green',
    },
});

export default ExcluirConta;