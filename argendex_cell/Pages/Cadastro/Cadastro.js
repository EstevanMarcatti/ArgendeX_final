import React, { useState } from "react";
import { View, TextInput, Image, KeyboardAvoidingView, TouchableOpacity, Text, Alert, ScrollView, ActivityIndicator } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useHeaderOptions from '../../components/Header.js';
import styles from "./Styles_cadastro";

const CadastroForm = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cidade, setCidade] = useState('');
    const [dataNascimento, setDataNascimento] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mensagensErro, setMensagensErro] = useState([]);
    const [loading, setLoading] = useState(false); // Estado para mostrar carregamento
    const [showPassword, setShowPassword] = useState(false); // Controla a visibilidade da senha

    const validarDados = () => {
        const erros = [];
        if (!nome || !email || !senha || !cidade || !dataNascimento) {
            erros.push('Todos os campos são obrigatórios.');
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            erros.push('E-mail inválido.');
        }
        if (senha.length < 6) {
            erros.push('A senha deve ter pelo menos 6 caracteres.');
        }
        return erros;
    }

    const handledCadastro = async () => {
        const errosValidacao = validarDados();
        if (errosValidacao.length > 0) {
            setMensagensErro(errosValidacao);
            return;
        }

        setLoading(true); // Inicia o carregamento

        const dados = { 
            nome, 
            email, 
            senha, 
            cidade, 
            dataNascimento: dataNascimento ? dataNascimento.toISOString().split('T')[0] : '' 
        };

        try {
            const resposta = await fetch('http://10.135.60.8:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            if (!resposta.ok) {
                const errorData = await resposta.json();
                throw new Error(errorData.mensagem.error || 'Erro desconhecido');
            }

            const resultado = await resposta.json();

            if (resultado.erro) {
                setMensagensErro([resultado.mensagem.error || 'Erro desconhecido']);
            } else {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
                    { 
                        text: 'OK', 
                        onPress: () => navigation.navigate('Calendario') // Navegar para a página do calendário
                    }
                ]);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            Alert.alert('Erro', error.message || 'Erro desconhecido');
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    }

    const handleDateConfirm = (date) => {
        setShowDatePicker(false);
        setDataNascimento(date);
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
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="E-mail"
                    placeholderTextColor='#b8b8b8'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Senha"
                    placeholderTextColor='#b8b8b8'
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.showPassword}>{showPassword ? 'Ocultar' : 'Mostrar'} Senha</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.inputs}
                    placeholder="Cidade"
                    placeholderTextColor='#b8b8b8'
                    value={cidade}
                    onChangeText={setCidade}
                />

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Selecione a data de nascimento"
                        placeholderTextColor='#b8b8b8'
                        editable={false}
                        value={dataNascimento ? dataNascimento.toLocaleDateString() : ''}
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
