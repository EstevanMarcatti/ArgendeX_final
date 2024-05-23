import { View, Image, KeyboardAvoidingView, TouchableOpacity, Text } from "react-native";
import { ScrollView } from "react-native";

import styles from "./Styles_plano";

const planoForm = () => {

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
    )
}

export default planoForm;