import React from 'react'
import { View, Pressable, Text, Image } from 'react-native'
import { DefaultButton } from '../components/elements/Button'
import { colors } from '../styles/colors'
import { global } from '../styles/global'
import { variables } from '../styles/variables'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { IniciarConGoogle } from '../database/helper'

const InicioScreen = ({navigation}) => {

    const [fontsLoaded] = useFonts({
        'nk57-monospace': require('../../assets/fonts/nk57-monospace-no-bk.ttf')
    })
    
    if (!fontsLoaded) return <AppLoading />

    return(
        <View style={global.default}>
            <Image source={require('../../assets/logo.png')} style={{width: 306, height: 227, alignSelf: 'center', marginBottom: 46, marginTop: 85}} />
            <Image source={require('../../assets/mensaje.png')} style={{width: 244, height: 129, alignSelf: 'center', marginBottom: 38}} />
            <DefaultButton title='Iniciar sesión' center='true' marginBottom={variables.spaceBetweenElems} func={() => {navigation.navigate('Iniciar Sesión')}} />
            <DefaultButton title='Iniciar sesión con Google' center='true' func={() => {IniciarConGoogle()}} />
            <Text style={[global.font, {marginVertical: 24, alignSelf: 'center', fontSize: 18}]}>ó</Text>
            <DefaultButton title='Registrarse' center='true' backgroundColor={colors.secondary} bold='true' func={() => {navigation.navigate('Registrar 1')}} />
        </View>
    )
}

export default InicioScreen