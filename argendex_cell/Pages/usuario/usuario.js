import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BlockExample = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Principais Configurações</Text>

            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('AtualizeConta')}
            >
                <Text style={styles.cardText}>Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ExcluirConta')}
            >
                <Text style={styles.cardText}>Deletar Conta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    card: {
        width: 300,
        padding: 15,
        backgroundColor: 'green',
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BlockExample;