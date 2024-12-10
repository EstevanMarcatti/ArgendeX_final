import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Cadastro from './Pages/Cadastro/Cadastro';
import TodoListScreen from './Pages/Calendar/TodoListScreen';
import Planos from './Pages/plano/Plano';
import Suporte from './Pages/Suporte/Suporte';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent() {
  const navigation = useNavigation(); // Obtém a navegação usando useNavigation()

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <View style={styles.drawerContent}>
          {/* Seu conteúdo personalizado do Drawer aqui */}
          <View>
            <Text style={styles.TxtMenu}>Menu</Text>
          </View>

          <TouchableOpacity style={styles.btnCriar} onPress={() => navigation.navigate('Calendario')}>
            <View style={styles.display}>

              <Text style={styles.TxtbtnMenu}>Calendario</Text>

            </View>

          </TouchableOpacity>

          <View style={styles.display}>
            <Image style={styles.logocl} resizeMode='contain' source={require('./assets/images/calendario.png')} />
          </View>

          <TouchableOpacity
            style={styles.btnCriar}
            onPress={() => navigation.navigate('Planos')}
          >
            <Text style={styles.TxtbtnMenu}>Planos</Text>
          </TouchableOpacity>
          <View style={styles.display}>
            <Image style={styles.logocl} resizeMode='contain' source={require('./assets/images/forma-de-pagamento.png')} />
          </View>
          <TouchableOpacity style={styles.btnCriar} onPress={() => navigation.navigate('Suporte')}>
            <Text style={styles.TxtbtnMenu}>Suporte</Text>
          </TouchableOpacity>
          <View style={styles.display}>
            <Image style={styles.logocl} resizeMode='contain' source={require('./assets/images/apoio-suporte.png')} />
          </View>
        </View>
      )}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Cadastro" component={Cadastro} />
      <Drawer.Screen name="Calendario" component={TodoListScreen} />
      <Drawer.Screen name="Planos" component={Planos} />
      <Drawer.Screen name="Suporte" component={Suporte} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <CustomDrawerContent />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#000', // Cor de fundo do Drawer.Navigator
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerText: {
    color: '#fff', // Cor do texto no Drawer.Navigator
    fontSize: 20,
    marginBottom: 10,
  },
  TxtbtnMenu: {
    color: '#fff',
    fontSize: 18,

  },
  btnCriar: {
    backgroundColor: 'green',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
    width: '90%',
    height: 45,
    borderRadius: 5,
  },
  TxtMenu: {
    fontSize: 30,
    color: '#fff',
    marginTop: -35,
  },
  display: {
    display: 'flex',
  },
  logocl: {
    width: 40,
    marginTop: -62,
    marginLeft: 5,

  },

});

export default App;
