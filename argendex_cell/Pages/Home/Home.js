import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import style from "./Style_home.js";
import useHeaderOptions from '../../components/Header.js'; // Importando o hook do header

export default function Home() {
    const navigation = useNavigation();
    
    // Usando o hook do header
    useHeaderOptions();

    return (
        <View style={style.background}>
            <View >
                <Image style={style.logo} resizeMode='contain' source={require('../../assets/images/argendex.png')} />
            </View>
            
            <TouchableOpacity style={style.btnCriar} onPress={() => navigation.navigate('Login')}>
                <Text style={style.Txtbtn}>Logar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.btnCriar} onPress={() => navigation.navigate('Cadastro')}>
                <Text style={style.Txtbtn}>Cadastrar</Text>
            </TouchableOpacity>
            
        </View>
    );
}

Home.navigationOptions = {
    headerTitle: 'Título Personalizado', // Define o título personalizado do header
};