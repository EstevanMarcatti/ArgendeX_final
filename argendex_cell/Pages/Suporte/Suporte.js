import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Animated, Image, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const SupportPage = () => {
  const [email, setEmail] = React.useState('');
  const [problema, setProblema] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [animation] = React.useState(new Animated.Value(1));

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    if (!problema.trim()) {
      Alert.alert('Erro', 'Por favor, descreva seu problema.');
      return;
    }

    console.log('E-mail:', email);
    console.log('Problema submetido:', problema);
    if (file) console.log('Arquivo anexado:', file.name);
    if (image) console.log('Foto anexada:', image.uri);

    Alert.alert('Problema submetido', 'Seu problema foi enviado com sucesso!');

    setEmail('');
    setProblema('');
    setFile(null);
    setImage(null);

    Animated.sequence([
      Animated.spring(animation, { toValue: 1.2, useNativeDriver: true }),
      Animated.spring(animation, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setFile(result);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível anexar o arquivo.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Você precisa conceder permissão para acessar a biblioteca de fotos.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível anexar a foto.');
    }
  };

  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Página de Suporte</Text>
        </View>

        <Text style={styles.contentText}>
          Bem-vindo à nossa página de suporte. Por favor, preencha as informações abaixo:
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Seu e-mail"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          value={problema}
          onChangeText={text => setProblema(text)}
          placeholder="Descreva seu problema aqui"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={pickDocument}>
            <Ionicons name="document" size={24} color="#E0E0E0" />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Anexar Arquivo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Ionicons name="images" size={24} color="#E0E0E0" />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Anexar Foto</Text>
            </View>
          </TouchableOpacity>
        </View>

        {file && (
          <View style={styles.attachment}>
            <Text style={styles.attachmentText}>Arquivo anexado: {file.name}</Text>
          </View>
        )}

        {image && (
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Animated.View style={[styles.buttonInner, { transform: [{ scale: animation }] }]}>
            <Text style={styles.submitButtonText}>Enviar Problema</Text>
          </Animated.View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Cor de fundo preto suave
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#E0E0E0', // Cor do texto do cabeçalho
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: '#E0E0E0', // Cor do texto do conteúdo
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333', // Cor de fundo do input mais escura
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 1,
    marginBottom: 20,
    color: '#E0E0E0', // Cor do texto do input
    fontSize: 16,
  },
  textArea: {
    height: 100, // Aumenta a altura para a área de texto
    textAlignVertical: 'top', // Alinha o texto no topo
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#121212', // Cor do fundo dos botões
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
    width: '45%', // Largura dos botões
    justifyContent: 'center', // Centraliza o conteúdo dentro do botão
  },
  buttonTextContainer: {
    marginTop: 5,
  },
  buttonText: {
    color: '#E0E0E0', // Cor do texto do botão
    fontSize: 14,
    fontWeight: 'bold',
  },
  attachment: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  attachmentText: {
    color: '#E0E0E0',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#00FF00', // Cor verde para o botão
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  submitButtonText: {
    color: '#fff', // Cor do texto do botão
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SupportPage;
