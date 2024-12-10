import React, { useState } from "react";
import { TextInput, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Image, View, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import styles from "./Styles_Login.js";
import useHeaderOptions from '../../components/Header.js'; // Importando o hook do header

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Adicionando estado de carregamento

  const handleLogin = async () => {
    setLoading(true); // Inicia o carregamento
    try {
      const response = await fetch('http://10.135.40.26:8085/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Senha: senha }),
      });

      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', data.mensagem.error || 'Erro desconhecido'); // Melhoria na mensagem de erro
      } else {
        // Sucesso no login, salvar ID no AsyncStorage
        await AsyncStorage.setItem('userId', data.mensagem.ID.toString()); // Armazenando o ID como string
        // Navegar para a próxima tela
        navigation.navigate('Calendario', { userId: data.mensagem.ID });
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      Alert.alert('Erro', 'Erro ao realizar login. Tente novamente.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  useHeaderOptions();

  return (
    <KeyboardAvoidingView style={styles.Background} behavior="padding">
      <View>
        <Image style={styles.Logo} resizeMode="contain" source={require('../../assets/images/argendex.png')} />
      </View>

      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TextInput
          style={styles.Inputs}
          value={email}
          placeholder="E-mail"
          placeholderTextColor='#b8b8b8'
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.Inputs}
          placeholder="Senha"
          value={senha}
          secureTextEntry
          placeholderTextColor='#b8b8b8'
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.btnCriar} onPress={handleLogin} disabled={loading}>
          <Text style={styles.Txtbtn}>{loading ? <ActivityIndicator color="#fff" /> : 'Logar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnvl} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.Txtbtn}>Ainda não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
