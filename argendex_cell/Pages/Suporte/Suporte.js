import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const SupportPage = () => {
  
  const [problema, setProblema] = React.useState('');

  const handleSubmit = () => {
    // Aqui você pode adicionar lógica para lidar com o problema submetido pelo usuário
    console.log('Problema submetido:', problema);
    // Exemplo simples de como lidar com a submissão do problema
    // Pode ser implementada uma lógica para enviar o problema para um servidor, etc.
    alert(`Problema submetido: ${problema}`);
    // Limpar o campo de entrada depois da submissão
    setProblema('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Página de Suporte</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.contentText}>
          Bem-vindo à nossa página de suporte. Por favor, descreva seu problema abaixo:
        </Text>
        
        <TextInput
          style={styles.input}
          value={problema}
          onChangeText={text => setProblema(text)}
          placeholder="Descreva seu problema aqui"
          multiline
          numberOfLines={4}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar Problema</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Cor de fundo preto
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff', // Cor do texto do cabeçalho
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: '#fff', // Cor do texto do conteúdo
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff', // Cor de fundo do input
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    color: '#000', // Cor do texto do input
  },
  button: {
    backgroundColor: '#00FF00', // Cor verde para o botão
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // Cor do texto do botão
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SupportPage;
