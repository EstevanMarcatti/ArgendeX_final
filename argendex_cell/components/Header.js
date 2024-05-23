import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function useHeaderOptions() {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
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
}
