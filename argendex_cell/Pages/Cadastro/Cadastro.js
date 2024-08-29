import React, { useState } from "react";
import { View, TextInput, Image, KeyboardAvoidingView, TouchableOpacity, Text, Alert, ScrollView, ActivityIndicator } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useHeaderOptions from '../../components/Header.js';
import styles from "./Styles_cadastro";

const CadastroForm = ({ navigation }) => {
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        cidade: '',
        dataNascimento: '',
        senha: '',
    });

    const [mensagensErro, setMensagensErro] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleChange = (name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleDateConfirm = (date) => {
        setShowDatePicker(false);
        handleChange('dataNascimento', date.toISOString().split('T')[0]);
    };

    const validarDados = () => {
        const erros = [];
        if (!formValues.nome || !formValues.email || !formValues.senha || !formValues.cidade || !formValues.dataNascimento) {
            erros.push('Todos os campos são obrigatórios.');
        }
        if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            erros.push('E-mail inválido.');
        }
        if (formValues.senha.length < 6) {
            erros.push('A senha deve ter pelo menos 6 caracteres.');
        }
        return erros;
    };

    const handledCadastro = async () => {
        const errosValidacao = validarDados();
        if (errosValidacao.length > 0) {
            setMensagensErro(errosValidacao);
            return;
        }

        setLoading(true);

        try {
            const resposta = await fetch('http://10.135.60.36:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (!resposta.ok) {
                // Se a resposta não for um JSON, tenta ler como texto
                const errorText = await resposta.text();
                try {
                    const errorData = JSON.parse(errorText);
                    throw new Error(errorData.erro || 'Erro desconhecido');
                } catch (e) {
                    throw new Error('Resposta do servidor não é JSON válido');
                }
            }

            const resultado = await resposta.json();

            if (resultado.erro) {
                console.error('Erro no servidor:', resultado.erro);
                setMensagensErro([resultado.erro]);
            } else {
                console.log('Dados processados com sucesso!', resultado);
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
                    { 
                        text: 'OK', 
                        onPress: () => navigation.navigate('Calendario') 
                    }
                ]);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            Alert.alert('Erro', error.message || 'Erro desconhecido');
            setMensagensErro([error.message || 'Erro desconhecido']);
        } finally {
            setLoading(false);
        }
    };

    useHeaderOptions();

    return (
        <KeyboardAvoidingView style={styles.Header} behavior="padding">
            <View style={styles.containerLogo}>
                <Image style={styles.logo} resizeMode='contain' source={require('../../assets/images/argendex.png')} />
            </View>

            <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Nome Completo"
                    placeholderTextColor='#b8b8b8'
                    value={formValues.nome}
                    onChangeText={(value) => handleChange('nome', value)}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="E-mail"
                    placeholderTextColor='#b8b8b8'
                    value={formValues.email}
                    onChangeText={(value) => handleChange('email', value)}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Senha"
                    placeholderTextColor='#b8b8b8'
                    value={formValues.senha}
                    onChangeText={(value) => handleChange('senha', value)}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.showPassword}>{showPassword ? 'Ocultar' : 'Mostrar'} Senha</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.inputs}
                    placeholder="Cidade"
                    placeholderTextColor='#b8b8b8'
                    value={formValues.cidade}
                    onChangeText={(value) => handleChange('cidade', value)}
                />

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Selecione a data de nascimento"
                        placeholderTextColor='#b8b8b8'
                        editable={false}
                        value={formValues.dataNascimento}
                    />
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={showDatePicker}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={() => setShowDatePicker(false)}
                />

                {mensagensErro.length > 0 && (
                    <View style={{ margin: 10 }}>
                        {mensagensErro.map((mensagem, index) => (
                            <Text key={index} style={{ color: 'red' }}>{mensagem}</Text>
                        ))}
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.btnCriar} onPress={handledCadastro} disabled={loading}>
                <Text style={styles.Txtbtn}>{loading ? <ActivityIndicator color="#fff" /> : 'Criar Cadastro'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnvl} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.Txtbtn}>Já tem cadastro? Logar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default CadastroForm;
