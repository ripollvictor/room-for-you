import React from 'react'
import { Image, View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import InicioScreen from            '../screens/InicioScreen'
import IniciarSesionScreen from     '../screens/IniciarSesionScreen'
import RegistrarUsuario1Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_1'
import RegistrarUsuario2Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_2'

import { BottomTabNavigator } from './TabNavigator'
import { variables } from '../styles/variables'
import { CustomHeader } from './CustomHeader'

const Stack = createStackNavigator()

const MainNavigator = () => {

    return(
        <Stack.Navigator
            screenOptions={{
                title: '',
                //headerBackImage: () => <Image source = {require('../../assets/backImage.png')} style={{width: 27, height: 22}} />,
                header: ({navigation}) => CustomHeader({navigation})
            }}
        >
            <Stack.Screen options={{ headerShown: false }} name='Inicio' component={ InicioScreen } />
            <Stack.Screen name='Iniciar Sesión' component={ IniciarSesionScreen } />
            <Stack.Screen name='Registrar 1' component={ RegistrarUsuario1Screen } />
            <Stack.Screen name='Registrar 2' component={ RegistrarUsuario2Screen } />
            <Stack.Screen options={{ headerShown: false }} name='Main' component={ BottomTabNavigator } />
        </Stack.Navigator>
    )
}

export { MainNavigator }