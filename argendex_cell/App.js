import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Cadastro from './Pages/Cadastro/Cadastro';
import TodoListScreen from './Pages/Calendar/TodoListScreen';
import Planos from './Pages/plano/Plano';
import Suporte from './Pages/Suporte/Suporte';
import usuario from './Pages/usuario/usuario';
import AtualizeConta from './Pages/AtualizaConta/AtualizaConta';
import ExcluirConta from './Pages/ExcluirConta/ExcluirConta';

// Criação do Drawer Navigator
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Função para o conteúdo customizado do Drawer
function CustomDrawerContent({ navigation }) {
  return (
    <View style={styles.drawerContent}>
      <View>
        <Text style={styles.TxtMenu}>Menu</Text>
      </View>

      <TouchableOpacity
        style={styles.btnCriar}
        onPress={() => navigation.navigate('Calendario')}
      >
        <View style={styles.btnContent}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('./assets/images/calendario.png')}
          />
          <Text style={styles.TxtbtnMenu}>Calendário</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnCriar}
        onPress={() => navigation.navigate('usuario')}
      >
        <View style={styles.btnContent}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('./assets/images/74472.png')}
          />
          <Text style={styles.TxtbtnMenu}>Usuário</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnCriar}
        onPress={() => navigation.navigate('Planos')}
      >
        <View style={styles.btnContent}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('./assets/images/forma-de-pagamento.png')}
          />
          <Text style={styles.TxtbtnMenu}>Planos</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnCriar}
        onPress={() => navigation.navigate('Suporte')}
      >
        <View style={styles.btnContent}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('./assets/images/apoio-suporte.png')}
          />
          <Text style={styles.TxtbtnMenu}>Suporte</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Função principal da navegação
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Cadastro" component={Cadastro} />
        <Drawer.Screen name="Calendario" component={TodoListScreen} />
        <Drawer.Screen name="Planos" component={Planos} />
        <Drawer.Screen name="usuario" component={usuario} />
        <Drawer.Screen name="Suporte" component={Suporte} />
        <Drawer.Screen name="AtualizeConta" component={AtualizeConta} />
        <Drawer.Screen name="ExcluirConta" component={ExcluirConta} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  TxtMenu: {
    fontSize: 30,
    color: '#fff',
    marginTop: -35,
  },
  btnCriar: {
    backgroundColor: 'green',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'flex-start', // Alinha o conteúdo à esquerda
    width: '90%',
    height: 60, // Aumenta a altura do botão para melhor visualização
    borderRadius: 5,
    flexDirection: 'row', // Alinha o ícone e o texto na mesma linha
    padding: 10, // Adiciona um pouco de espaçamento interno
  },
  TxtbtnMenu: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10, // Adiciona espaçamento entre o ícone e o texto
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    width: 40, // Tamanho maior do ícone
    height: 40, // Tamanho maior do ícone
  },
});

export default App;
