import React from "react"
import { View, Image, Text } from "react-native"
import Button from "../components/Button"
import { screenStyles } from '../styles/InicioScreenStyles'

const InicioScreen = ({navigation}) => {

    return(
        <View style={screenStyles.container}>
            <Image style={screenStyles.logo} source={require('../assets/logo.png')} />
            <Text style={screenStyles.welcomeText}>Bienvenido</Text>
            <Button onPress={() => { navigation.navigate('Iniciar Sesion') }} style={screenStyles.buttonSpace}>Iniciar sesión</Button>
            <Button style={screenStyles.buttonSpace} imgSrc={require('../assets/google-icon.png')}>Iniciar sesión con Google</Button>
            <Button onPress={() => { navigation.navigate('Registrar Usuario') }}>Registrarse</Button>
        </View>
    )

}

export default InicioScreen