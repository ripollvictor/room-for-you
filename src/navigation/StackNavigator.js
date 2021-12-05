import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import VerOfertasScreen from        '../screens/Ofertas/VerOfertasScreen'
import BusquedaMapaScreen from          '../screens/BusquedaMapaScreen'
import VerPerfilScreen from         '../screens/VerPerfilScreen'

import ListaMisOfertasScreen from   '../screens/Ofertas/ListaMisOfertasScreen'
import RegistrarOfertaScreen from   '../screens/Ofertas/RegistrarOfertaScreen'
import VerOfertaScreen from         '../screens/Ofertas/VerOfertaScreen'
import HereMapScreen from '../screens/HereMapScreen'

const Stack = createStackNavigator()

const OfertasNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Ver Ofertas' component={ VerOfertasScreen } />
        </Stack.Navigator>
    )
}

const BusquedaNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='BusquedaMapaScreen' component={ BusquedaMapaScreen } />
        </Stack.Navigator>
    )
}

const PerfilNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Ver Perfil' component={ VerPerfilScreen } />
        </Stack.Navigator>
    )
}

export { OfertasNavigator, BusquedaNavigator, PerfilNavigator }