import { screenStyles } from './styles'

import React from "react"
import { View, Image, Text } from "react-native"
import { IniciarConGoogle, CerrarSesion, DebugDB } from '../../database/helper'
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
            <Button onPress={() => { DebugDB() }} style={screenStyles.buttonSpace} >Prueba</Button>
            <Button onPress={() => { IrPagina('RegistrarUsuario') }}style={screenStyles.buttonSpace}>Registrarse</Button>
             <Button onPress={() => {navigation.navigate("Pruebas")}}style={screenStyles.buttonSpace}>Pruebas Popu algo descriptibo , descriptivo*</Button>
        </View>
    )

}

export default InicioScreen
