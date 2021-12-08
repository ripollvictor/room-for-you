import React, { useEffect } from 'react'
import { Alert, BackHandler, Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs'

import { TabIcon } from '../components/elements/Icon'
import { variables } from '../styles/variables'

import VerFavoritosScreen from      '../screens/Favoritos/VerFavoritosScreen'
import VerSolicitantesScreen from   '../screens/Favoritos/VerSolicitantesScreen'

import { OfertasNavigator, FavoritosNavigator, PerfilNavigator, BusquedaNavigator } from './StackNavigator'

const Tab = createBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()

const BottomTabNavigator = ({navigation}) => {

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            e.preventDefault()

            Alert.alert(
                '¿Quieres salir de la aplicación?', null,
                [
                    {
                        text: 'No',
                        style: 'cancel',
                        onPress: () => {}
                    },
                    {
                        text: 'Sí',
                        style: 'destructive',
                        onPress: () => { BackHandler.exitApp() }
                    }
                ]
            )
        })
    }, [navigation])


    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: variables.bottomMenuHeight,
                backgroundColor: 'transparent',
                position: 'absolute',
                borderTopWidth: 0,
                elevation: 0,
            },
            tabBarShowLabel: false // para que no aparezca el texto
        }}>
            <Tab.Screen
                options={{
                    tabBarIcon: ({focused}) => {
                        return(
                            <TabIcon isFocused={focused} url={require('../../assets/icons/ofertas.png')} />
                        )
                    }
                }}
                name='OfertasTab'
                component={ OfertasNavigator } />
            <Tab.Screen
                options={{
                    tabBarIcon: ({focused}) => {
                        return(
                            <TabIcon isFocused={focused} url={require('../../assets/icons/busqueda.png')} />
                        )
                    }
                }}
                name='BusquedaTab'
                component={ BusquedaNavigator } />
            <Tab.Screen
                options={{
                    tabBarIcon: ({focused}) => {
                        return(
                            <TabIcon isFocused={focused} url={require('../../assets/icons/favoritos.png')} />
                        )
                    }
                }}
                name='FavoritosTab'
                component={ FavoritosNavigator } />
            <Tab.Screen
                options={{
                    tabBarIcon: ({focused}) => {
                        return(
                            <TabIcon isFocused={focused} url={require('../../assets/icons/perfil.png')} />
                        )
                    }
                }}
                name='PerfilTab'
                component={ PerfilNavigator } />
        </Tab.Navigator>
    )
}

export { BottomTabNavigator }