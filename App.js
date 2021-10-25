import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RegistrarViviendaScreen from './screens/RegistrarViviendaScreen';
import RegisterUserScreen from './screens/RegisterUserScreen';
import InicioScreen from './screens/InicioScreen';
import IniciarSesionScreen from './screens/IniciarSesionScreen';
import MatchesScreen from './screens/MatchesScreen';

const Stack = createNativeStackNavigator()
function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='Matches' component={ MatchesScreen }/>
      <Stack.Screen name="Inicio" component={ InicioScreen }/>
      <Stack.Screen name="Iniciar Sesion" component={ IniciarSesionScreen }/>
      <Stack.Screen name="Registrar Vivienda" component= {RegistrarViviendaScreen}/>
      <Stack.Screen name="Registrar Usuario" component= {RegisterUserScreen}/>
      <Stack.Screen name="Home" component= {HomeScreen}/> 

    </Stack.Navigator>
  )

}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
