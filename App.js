import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { MainNavigator } from './src/navigation/MainNavigator';
import ChatScreen from './old/screens/Chat/ChatScreen';
import IniciarSesionScreen from './old/screens/IniciarSesion/IniciarSesionScreen'

const App = () => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="IniciarSesion" component={ IniciarSesionScreen } />
                <Stack.Screen name = 'Chat' component={ChatScreen}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const App1 = () => {
    return(
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    )
} 

export default App
