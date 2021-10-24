import React from "react"
import { View, Image, Text } from "react-native"

import Button from "../components/Button"
import Input from "../components/Input"

import { screenStyles } from '../styles/IniciarSesionScreenStyles'

const IniciarSesionScreen = ({navigation}) => {

    return(
        <View style={screenStyles.container}>
            <Image style={screenStyles.logo} source={require('../assets/logo.png')} />
            <Text style={screenStyles.mainText}>Introduce tus datos</Text>

            {/* AQUI VAN LOS INPUTS */}
            <Input placeholder='Correo electrónico' style={screenStyles.inputSpace} />
            <Input inputType='password' placeholder='Contraseña' />

            <View style={screenStyles.btnWrap}>
                <Button btnType='blue'>Iniciar sesión</Button>
            </View>

        </View>
    )

}

export default IniciarSesionScreen