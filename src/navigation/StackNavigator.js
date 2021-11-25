import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import VerOfertasScreen from        '../screens/Ofertas/VerOfertasScreen'
import BusquedaScreen from          '../screens/BusquedaScreen'
import VerFavoritosScreen from      '../screens/Favoritos/VerFavoritosScreen'
import VerPerfilScreen from         '../screens/VerPerfilScreen'

import ListaMisOfertasScreen from   '../screens/Ofertas/ListaMisOfertasScreen'
import RegistrarOfertaScreen from   '../screens/Ofertas/RegistrarOfertaScreen'
import VerOfertaScreen from         '../screens/Ofertas/VerOfertaScreen'
import VerSolicitantesScreen from   '../screens/Favoritos/VerSolicitantesScreen'


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
            <Stack.Screen name='Busqueda' component={ BusquedaScreen } />
        </Stack.Navigator>
    )
}

const FavoritosNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Favoritos' component={ VerFavoritosScreen } />
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

export { OfertasNavigator, FavoritosNavigator, BusquedaNavigator, PerfilNavigator }