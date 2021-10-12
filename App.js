import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterUserScreen from './screens/RegisterUserScreen';

const Stack = createNativeStackNavigator()
function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Registrar Usuario" component= {RegisterUserScreen}/>
      <Stack.Screen name="Login" component= {LoginScreen}/>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
