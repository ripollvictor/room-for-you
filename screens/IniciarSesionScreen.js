import React from "react"
import { View, Image, Text } from "react-native"
import Button from "../components/Button"
import { screenStyles } from '../styles/IniciarSesionScreenStyles'

const IniciarSesionScreen = ({navigation}) => {

    return(
        <View style={screenStyles.container}>
            <Image style={screenStyles.logo} source={require('../assets/logo.png')} />
            <Text style={screenStyles.mainText}>Introduce tus datos</Text>
        </View>
    )

}

export default IniciarSesionScreen