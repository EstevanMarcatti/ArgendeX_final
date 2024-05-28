import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Cadastro from './Pages/Cadastro/Cadastro'
import TodoListScreen from './Pages/Calendar/TodoListScreen'
import Addtarefa from './Pages/AddTarefa/Addtarefa'


const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=" " component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Calendario" component={TodoListScreen} />
        <Stack.Screen name="Addtarefa" component={Addtarefa} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;