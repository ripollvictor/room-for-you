import { screenStyles } from './styles'

import React from "react"
import { View, Image, Text } from "react-native"
import { IniciarConGoogle, CerrarSesion, DebugDB, GetInterestedUsers } from '../../database/helper'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

import Button from "../../components/Button/Button"

const InicioScreen = ({navigation}) => {

    const IrPagina = nombrePag => {
        navigation.navigate(nombrePag)
    }

    const Prueba = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()

        console.log(auth)
    }

    return(
        <View style={screenStyles.container}>
            <Image style={screenStyles.logo} source={require('../../assets/logo.png')} />
            <Text style={screenStyles.welcomeText}>Bienvenido</Text>
            <Button onPress={() => { IrPagina('IniciarSesion') }} style={screenStyles.buttonSpace}>Iniciar sesión</Button>
            <Button onPress={() => { IniciarConGoogle() }} style={screenStyles.buttonSpace} imgSrc={require('../../assets/google-icon.png')}>Iniciar sesión con Google</Button>
            <Button onPress={() => { CerrarSesion() }} style={screenStyles.buttonSpace} >Cerrar sesión</Button>
            <Button onPress={() => { GetInterestedUsers() }} style={screenStyles.buttonSpace} >Prueba</Button>
            <Button onPress={() => { IrPagina('RegistrarUsuario') }}>Registrarse</Button>
        </View>
    )

}

export default InicioScreen
