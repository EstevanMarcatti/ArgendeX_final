import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import style from "./Style_home.js";


export default function Home() {

    
    // Usando o hook do header
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#000', // Definindo a cor verde para o header
            },
            headerTintColor: '#fff', // Definindo a cor do texto do header como branco
            headerTitleStyle: { // Estilo para o texto do título do header
                fontWeight: 'bold',
                fontSize: 30,
            },
        });
        
    }, [navigation]);

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