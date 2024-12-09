import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ConfigConta = () => {
    const navigation = useNavigation();
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        senha: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = await AsyncStorage.getItem('userID'); // Recupera o ID do AsyncStorage

            if (userId) {
                try {

                    const response = await fetch(`http://10.135.60.62:8085/dados-usuario/${userId}`);

                    const data = await response.json();

                    if (data.erro) {
                        console.error('Erro ao obter dados do usuário:', data.erro);
                    } else {
                        setFormValues({
                            nome: data.nome || '',
                            email: data.email || '',
                            senha: data.senha || '',
                        });
                    }
                } catch (error) {
                    console.error('Erro ao obter dados do usuário:', error);
                }
            } else {
                console.error('ID do usuário não encontrado.');
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const userId = await AsyncStorage.getItem('userID');

        if (userId) {
            try {
                const response = await fetch(`http://10.135.60.62:8085/atualizar-dados/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result.mensagem);
                    navigation.navigate('Home');
                } else {
                    const error = await response.json();
                    console.error('Erro ao atualizar dados do usuário:', error.erro);
                }
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuração de Conta</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome de Usuário"
                value={formValues.nome}
                onChangeText={(text) => handleChange('nome', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formValues.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={formValues.senha}
                onChangeText={(text) => handleChange('senha', text)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.btnCriar} onPress={handleSubmit}>
                <Text style={styles.TxtbtnMenu}>Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btnCriar, { backgroundColor: 'red' }]}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.TxtbtnMenu}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    btnCriar: {
        backgroundColor: 'green',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 15,
        alignItems: 'center',
        width: '90%',
        height: 45,
        borderRadius: 5,
    },
    TxtbtnMenu: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ConfigConta;