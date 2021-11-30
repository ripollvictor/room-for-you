import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import InicioScreen from            '../screens/InicioScreen'
import IniciarSesionScreen from '../../old/screens/IniciarSesion/IniciarSesionScreen'
import RegistrarUsuario1Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_1'
import RegistrarUsuario2Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_2'
import RegistrarUsuario3Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_3'
import RegistrarUsuario4Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_4'
import RegistrarUsuario5Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_5'
import RegistrarUsuario6Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_6'
import VerFavoritosScreen from '../screens/Favoritos/VerFavoritosScreen'

import { BottomTabNavigator } from './TabNavigator'

const Stack = createStackNavigator()

const MainNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Iniciar Sesión' component={ IniciarSesionScreen } />
            <Stack.Screen name='Ver Favoritos' component={ VerFavoritosScreen } />
            <Stack.Screen name='Inicio' component={ InicioScreen } />
            <Stack.Screen name='Registrar 1' component={ RegistrarUsuario1Screen } />
            <Stack.Screen name='Registrar 2' component={ RegistrarUsuario2Screen } />
            <Stack.Screen name='Registrar 3' component={ RegistrarUsuario3Screen } />
            <Stack.Screen name='Registrar 4' component={ RegistrarUsuario4Screen } />
            <Stack.Screen name='Registrar 5' component={ RegistrarUsuario5Screen } />
            <Stack.Screen name='Registrar 6' component={ RegistrarUsuario6Screen } />
            <Stack.Screen options={{ headerShown: false }} name='Main' component={ BottomTabNavigator } />
        </Stack.Navigator>
    )
}

export { MainNavigator }