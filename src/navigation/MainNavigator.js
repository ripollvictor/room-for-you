import React from 'react'
import { Image, View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import InicioScreen from            '../screens/InicioScreen'
import IniciarSesionScreen from     '../screens/IniciarSesionScreen'
import RegistrarUsuario1Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_1'
import RegistrarUsuario2Screen from '../screens/RegistrarUsuario/RegistrarUsuarioScreen_2'

import RegistrarUsuario3Screen from '../screens/Busqueda/RegistrarUsuarioScreen_3'
import RegistrarUsuario4Screen from '../screens/Busqueda/RegistrarUsuarioScreen_4'
import RegistrarUsuario5Screen from '../screens/Busqueda/RegistrarUsuarioScreen_5'
import RegistrarUsuario6Screen from '../screens/Busqueda/RegistrarUsuarioScreen_6'
import BusquedaScreen from '../screens/Busqueda/BusquedaScreen'

import RegistrarOfertaScreen from '../screens/Ofertas/RegistrarOfertaScreen'
import RegistrarOferta2Screen from '../screens/Ofertas/RegistrarOferta2Screen'
import RegistrarOferta3Screen from '../screens/Ofertas/RegistrarOferta3Screen'

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

            <Stack.Screen name='Filtros 1' component={ RegistrarUsuario3Screen } />
            <Stack.Screen name='Filtros 2' component={ RegistrarUsuario4Screen } />
            <Stack.Screen name='Filtros 3' component={ RegistrarUsuario5Screen } />
            <Stack.Screen name='Filtros 4' component={ RegistrarUsuario6Screen } />
            <Stack.Screen name='Radio' component={ BusquedaScreen } />

            <Stack.Screen name='Oferta 1' component={ RegistrarOfertaScreen } />
            <Stack.Screen name='Oferta 2' component={ RegistrarOferta2Screen } />
            <Stack.Screen name='Oferta 3' component={ RegistrarOferta3Screen } />

            <Stack.Screen options={{ headerShown: false }} name='Main' component={ BottomTabNavigator } />
        </Stack.Navigator>
    )
}

export { MainNavigator }