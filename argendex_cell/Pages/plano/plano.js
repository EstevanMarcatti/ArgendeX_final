import React from 'react';
import { View, Image, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import styles from "./Styles_plano"; // Certifique-se de importar os estilos corretamente

const PlanoForm = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            
            headerStyle: {
                backgroundColor: '#191515', // Definindo a cor verde para o header
            },
            headerTintColor: '#fff', // Definindo a cor do texto do header como branco
            headerTitleStyle: { // Estilo para o texto do título do header
                fontWeight: 'bold',
                fontSize: 30,
            },
        });
    }, [navigation]);

    return (
        <KeyboardAvoidingView style={styles.Header} behavior="padding">

        <View style={styles.containerLogo}>
            <Image style={styles.logo} resizeMode='contain' source={require('./imagesPlano/argendex.png')} />
        </View>

        <Text style={styles.txtinicio} >Assine nossos planos para receber os beneficios</Text>
        <View style={styles.barra}></View>

        <ScrollView style={styles.plano}>

            <View style={styles.universitario}>

                <View>
                    <Image style={styles.logoplano} resizeMode='contain' source={require('./imagesPlano/Logion.png')} />
                </View>

                <Text style={styles.txttitulo}> UNIVERSITARIO</Text>
                <Text style={styles.txtvalor}>R$86,90/ANUAL</Text>
                <View style={styles.barraplano}></View>
                <Text style={styles.txtplano}>* Personalização do site</Text>
                <Text style={styles.txtplano}>* Núcleos de escolha própria</Text>
                <Text style={styles.txtplano}>* Adicionar mais lembretes</Text>

                <TouchableOpacity style={styles.btnplano} >
                    <Text style={styles.Txtbtn} >Adquirir Agora</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.avancado}>

                <View>
                    <Image style={styles.logoplano2} resizeMode='contain' source={require('./imagesPlano/Logion.png')} />
                </View>

                <Text style={styles.txttitulo}> AVANÇADO</Text>
                <Text style={styles.txtvalor}>R$152,90/ANUAL</Text>
                <View style={styles.barraplano}></View>
                <Text style={styles.txtplano}>* Personalização do site</Text>
                <Text style={styles.txtplano}>* Núcleos de escolha própria</Text>
                <Text style={styles.txtplano}>* Adicionar mais lembretes</Text>
                <Text style={styles.txtplano}>* Agendamento ilimitado</Text>

                <TouchableOpacity style={styles.btnplano} >
                    <Text style={styles.Txtbtn} >Adquirir Agora</Text>
                </TouchableOpacity>
            </View>


        </ScrollView>

    </KeyboardAvoidingView>
    );
}

export default PlanoForm;
