import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { CerrarSesion } from '../database/helper'

const VerPerfilScreen = ({navigation}) => {

    const Salir = async () => {
        navigation.navigate('ListaContactos')
    }

    return(
        <View style={{flex: 1}}>
            <Pressable style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onPress={() => {Salir()}}><Text>Cerrar sesión</Text></Pressable>
        </View>
    )
}

export default VerPerfilScreen