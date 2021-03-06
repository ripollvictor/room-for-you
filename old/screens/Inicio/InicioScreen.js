import { screenStyles } from './styles'

import React from "react"
import { View, Image, Text } from "react-native"
import { IniciarConGoogle, CerrarSesion, GetFavoritos, GetSolicitudes } from '../../database/helper'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

import Button from "../../components/Button/Button"
import {getViviendaconid , listaVivienda,getViviendaconidvivieda,anadirHabitacion,habitacionSetEstadoLibre,habitacionSetEstadoOcupada,anadirCompaneroalPiso,eliminarCompanerobyidTabla}from "../../database/funcionesfirebase"

const InicioScreen = ({navigation}) => {
    const popu = "6EDH4346";
    const IrPagina = nombrePag => {
        navigation.navigate(nombrePag)
    }

    const Prueba = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()

        console.log(auth)
    }
    // anadirHabitacion(data)
    const data={Caracteristicas: "grande",Estado: 0,MetrosCuadrados:384343,Precio:349434,id_vivienda:"34HDE4343"}
    return(
        <View style={screenStyles.container}>
            <Image style={screenStyles.logo} source={require('../../assets/logo.png')} />
            <Text style={screenStyles.welcomeText}>Bienvenido</Text>
            <Button onPress={() => { IrPagina('IniciarSesion') }} style={screenStyles.buttonSpace}>Iniciar sesión</Button>
            <Button onPress={() => { IniciarConGoogle() }} style={screenStyles.buttonSpace} imgSrc={require('../../assets/google-icon.png')}>Iniciar sesión con Google</Button>
            <Button onPress={() => { CerrarSesion() }} style={screenStyles.buttonSpace} >Cerrar sesión</Button>
            <Button onPress={() => { GetFavoritos() }} style={screenStyles.buttonSpace} >Prueba get favoritos</Button>
            <Button onPress={() => { GetSolicitudes() }} style={screenStyles.buttonSpace} >Prueba get solicitudes</Button>
            <Button onPress={() => { IrPagina('RegistrarUsuario') }}>Registrarse</Button>
        </View>
    )

}

export default InicioScreen
