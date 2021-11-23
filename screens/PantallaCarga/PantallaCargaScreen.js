import {} from "../Inicio/InicioScreen";
import { screenStyles } from './styles'
import React from "react"
import { View, ImageBackground, Image} from "react-native"
import { Button } from "react-native-elements/dist/buttons/Button";

const PantallaCargaScreen = ({navigation}) => {

    tiempoCarga()

    function irPagina () {
        navigation.navigate('Inicio')
    }

    function tiempoCarga(){
        setTimeout(() => {
            irPagina()
        }, 3000);
    }
    return (
        <View style={screenStyles.container}>
            <ImageBackground style={screenStyles.logo} source={require('../../assets/SplashScreen.png')} />
        </View>
    )

}

export default PantallaCargaScreen