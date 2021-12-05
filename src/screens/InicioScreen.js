import React from 'react'
import { View, Pressable, Text, Image } from 'react-native'
import { DefaultButton } from '../components/elements/Button'
import { colors } from '../styles/colors'
import { global } from '../styles/global'
import { variables } from '../styles/variables'
import { IniciarConGoogle } from '../database/helper'

const InicioScreen = ({navigation}) => {

    const CheckGoogleLogIn = async () => {
        try {
            await IniciarConGoogle()
            navigation.navigate('Main')
        }
        catch {
            console.log('error')
        }
    }

    return(
        <View style={global.default}>
            <Image source={require('../../assets/logo.png')} style={{width: 306, height: 227, alignSelf: 'center', marginBottom: 46, marginTop: 85}} />
            <Image source={require('../../assets/mensaje.png')} style={{width: 244, height: 129, alignSelf: 'center', marginBottom: 38}} />
            <DefaultButton title='Iniciar sesión' center='true' marginBottom={variables.spaceBetweenElems} func={() => {navigation.navigate('Iniciar Sesión')}} />
            <DefaultButton title='Iniciar sesión con Google' center='true' func={() => {CheckGoogleLogIn()}} />
            <Text style={[global.font, {marginVertical: 24, alignSelf: 'center', fontSize: 18}]}>ó</Text>
            <DefaultButton title='Registrarse' center='true' backgroundColor={colors.secondary} bold='true' func={() => {navigation.navigate('Registrar 1')}} />
        </View>
    )
}

export default InicioScreen