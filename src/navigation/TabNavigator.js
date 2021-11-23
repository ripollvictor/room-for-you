import React from 'react'
import { Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs'

import VerFavoritosScreen from      '../screens/Favoritos/VerFavoritosScreen'
import VerSolicitantesScreen from   '../screens/Favoritos/VerSolicitantesScreen'

import { OfertasNavigator, PerfilNavigator, BusquedaNavigator } from './StackNavigator'

const Tab = createBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()

const BottomTabNavigator = () => {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: true,
            tabBarStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                borderTopWidth: 0,
                elevation: 0,
            },
            tabBarShowLabel: false // para que no aparezca el texto
        }}>
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({size, focused}) => {
                        return(
                            <Image style={{width: 30, height: size, backgroundColor: focused ? '#B77ADF' : 'transparent'}} source={require('../../assets/icons/ofertas.png')} />
                        )
                    }
                }}
                name='OfertasTab'
                component={ OfertasNavigator } />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({size, focused}) => {
                        return(
                            <Image style={{width: 30, height: size, backgroundColor: focused ? '#B77ADF' : 'transparent'}} source={require('../../assets/icons/busqueda.png')} />
                        )
                    }
                }}
                name='BusquedaTab'
                component={ BusquedaNavigator } />
            <Tab.Screen
                options={{
                    title: 'Favoritos',
                    headerShown: true,
                    tabBarIcon: ({size, focused}) => {
                        return(
                            <Image style={{width: 30, height: size, backgroundColor: focused ? '#B77ADF' : 'transparent'}} source={require('../../assets/icons/favoritos.png')} />
                        )
                    }
                }}
                name='FavoritosTab'
                component={ FavoritosTabNavigator } />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({size, focused}) => {
                        return(
                            <Image style={{width: size, height: size, backgroundColor: focused ? '#B77ADF' : 'transparent'}} source={require('../../assets/icons/perfil.png')} />
                        )
                    }
                }}
                name='PerfilTab'
                component={ PerfilNavigator } />
        </Tab.Navigator>
    )
}

const FavoritosTabNavigator = () => {
    return(
        <TopTab.Navigator>
            <TopTab.Screen name='Favoritos' component={ VerFavoritosScreen } />
            <TopTab.Screen name='Solicitantes' component={ VerSolicitantesScreen } />
        </TopTab.Navigator>
    )
}

export { BottomTabNavigator }