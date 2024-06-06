import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';  
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

function Home() {
  return (
    <View>
      <Text>App Screen</Text>
    </View>
  );
}

function Configuracoes() {
  return (
    <View>
      <Text>App Two Screen</Text>
    </View>
  );
}

export default function Menu() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="App"
        drawerStyle={{
          backgroundColor: "#313131",
          paddingVertical: 20,
        }}
        drawerContentOptions={{
          activeBackgroundColor: "#fff",
          activeTintColor: "#131313",
          inactiveTintColor: "#fff",
        }}
      >
        <Drawer.Screen
          name="App"
          component={Home}
          options={{
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#131313" : "#fff" }}>Primeira Tela</Text>
            ),
            drawerIcon: ({ focused }) => (
              <Icon color={focused ? "#131313" : "#fff"} name="home" />
            ),
          }}
        />
        <Drawer.Screen
          name="AppTwo"
          component={Configuracoes}
          options={{
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#131313" : "#fff" }}>Segunda Tela</Text>
            ),
            drawerIcon: ({ focused }) => (
              <Icon color={focused ? "#131313" : "#fff"} name="chat" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
