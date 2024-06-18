import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Cadastro from './Pages/Cadastro/Cadastro';
import TodoListScreen from './Pages/Calendar/TodoListScreen';
import Addtarefa from './Pages/AddTarefa/Addtarefa';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Cadastro" component={Cadastro} />
        <Drawer.Screen name="Calendario" component={TodoListScreen} />
        <Drawer.Screen name="Addtarefa" component={Addtarefa} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
