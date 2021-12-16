import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import VerOfertasScreen from        '../screens/Ofertas/VerOfertasScreen'
import BusquedaScreen from          '../screens/Busqueda/BusquedaScreen'
import VerFavoritosScreen from      '../screens/Favoritos/VerFavoritosScreen'
import VerPerfilScreen from         '../screens/VerPerfilScreen'

import ListaMisOfertasScreen from   '../screens/Ofertas/ListaMisOfertasScreen'
import RegistrarOfertaScreen from   '../screens/Ofertas/RegistrarOfertaScreen'
import VerOfertaScreen from         '../screens/Ofertas/VerOfertaScreen'
import VerSolicitantesScreen from   '../screens/Favoritos/VerSolicitantesScreen'
import ListaContactosScreen from '../screens/Mensajeria/ListaContactosScreen'
import ChatScreen from '../screens/Mensajeria/ChatScreen'



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
            <Stack.Screen name='BusquedaScreen' component={ BusquedaScreen } />
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
            <Stack.Screen name="ListaContactos" component={ ListaContactosScreen } />
            <Stack.Screen name='Chat2' component={ ChatScreen } />
        </Stack.Navigator>
    )
}

export { OfertasNavigator, FavoritosNavigator, BusquedaNavigator, PerfilNavigator }