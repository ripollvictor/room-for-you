
import {} from "../Inicio/InicioScreen";
import { screenStyles } from './styles'
import React from "react"
import { View, ImageBackground} from "react-native"
import { Button } from "react-native-elements/dist/buttons/Button";

const PantallaCargaScreen = ({navigation}) => {
   // uriSplashScreen = '/Users/sergiaguileramorales/Desktop/RoomForYou/App/room-for-you/assets/SplashScreen.png'
   const image = { uri: "../assets/SplashScreen.png" }
    tiempoCarga()

    function irPagina () {
        navigation.navigate('Inicio')
    }

    function tiempoCarga(){
        setTimeout(() => {
            irPagina()
        }, 4000);
    }
    return (
        <View>
            <ImageBackground source={image} resizeMode="cover">
                
            </ImageBackground>
            
        </View>
    )

}

export default PantallaCargaScreen