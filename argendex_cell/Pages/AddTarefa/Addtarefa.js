import React, { useState } from "react";
import { TextInput, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Image, View } from "react-native";
import styles from "./Style_Add.js";
import useHeaderOptions from '../../components/Header.js'; // Importando o hook do header

const Addtarefa = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');

  const handleLogin = () => {
    console.log("Email", email);
    setEmail('');
    console.log("Senha", Senha);
    setSenha('');
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
          value={Senha}
          placeholderTextColor={'#b8b8b8'}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.btnCriar} onPress={() => navigation.navigate('Calendario')}>
          <Text style={styles.Txtbtn} /*onPress={handleLogin}*/ >Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnvl} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.Txtbtn}>Ainda não tem conta? Cadastre-se</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Addtarefa;
