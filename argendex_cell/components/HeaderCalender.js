import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

const useHeaderOptions = () => {
    const navigation = useNavigation();

    useEffect(() => {
        // Remover o cabeçalho
        navigation.setOptions({
            headerShown: false,
        });

        // Desabilitar a capacidade de voltar para a página anterior
        const backAction = () => {
            // Impedir que o usuário volte à tela anterior
            return true;
        };

        const backHandler = navigation.addListener(
            'beforeRemove',
            (e) => {
                e.preventDefault();
            }
        );

        return () => backHandler.remove();
    }, [navigation]);

    return null;
};

export default useHeaderOptions;