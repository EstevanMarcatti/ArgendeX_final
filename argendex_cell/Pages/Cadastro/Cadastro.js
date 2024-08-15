import React, { useState } from "react";
import { View, TextInput, Image, KeyboardAvoidingView, TouchableOpacity, Button, Text, Alert } from "react-native";
import { ScrollView } from "react-native";
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

    const handledCadastro = async () => {
        const dados = { nome, email, senha, cidade, dataNascimento: dataNascimento ? dataNascimento.toISOString().split('T')[0] : '' };

        try {
            const resposta = await fetch('http://10.135.60.8:8085/receber-dados', { // Substitua com o IP e a porta corretos
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });

            const resultado = await resposta.json();

            if (resultado.erro) {
                setMensagensErro(resultado.mensagens);
            } else {
                navigation.navigate('Calendario');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            Alert.alert('Erro de Rede', 'Falha na solicitação de rede. Verifique sua conexão.');
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
                <TextInput style={styles.inputs} placeholder="Nome Completo" placeholderTextColor='#b8b8b8' value={nome} onChangeText={setNome} />
                <TextInput style={styles.inputs} placeholder="E-mail" placeholderTextColor='#b8b8b8' value={email} onChangeText={setEmail} />
                <TextInput style={styles.inputs} placeholder="Senha" placeholderTextColor='#b8b8b8' value={senha} onChangeText={setSenha} secureTextEntry={true} />
                <TextInput style={styles.inputs} placeholder="Cidade" placeholderTextColor='#b8b8b8' value={cidade} onChangeText={setCidade} />

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput style={styles.inputs} placeholder="Selecione a data de nascimento" placeholderTextColor='#b8b8b8' editable={false} value={dataNascimento ? dataNascimento.toLocaleDateString() : ''} />
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
                            <Text key={index} style={{ color: 'red' }}>{mensagem.mensagem}</Text>
                        ))}
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.btnCriar} onPress={handledCadastro}>
                <Text style={styles.Txtbtn}>Criar Cadastro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnvl} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.Txtbtn}>Ja tem cadastro? Logar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default CadastroForm;
