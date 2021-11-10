import { screenStyles } from './styles'

import React from "react"
import { View, Image, Text } from "react-native"
import { IniciarConGoogle, CerrarSesion, DebugDB } from '../../database/helper'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

import Button from "../../components/Button/Button"
import {getViviendaconid , listaVivienda}from "../../database/funcionesfirebase"

const ModificarVivienda = ({navigation,vivienda}) => {
    const [Vivienda, setCredentials] = useState({
        Banos: vivienda.Banos,
        Direccion: vivienda.Direccion,
        EscaleraPisoPuerta: vivienda.EscaleraPisoPuerta,
        FechaRegistro: vivienda.FechaRegistro,
        Imagenes: vivienda.Imagenes,
        MetrosCuadrados: vivienda.MetrosCuadrados,
        NumHabitaciones: vivienda.NumHabitaciones,
        Ubicacion: vivienda.Ubicacion,
        id_usuario: vivienda.id_usuario
    })
    const handleChangeText = (name, value) => {
        setState({...Vivienda, [name]: value});
    }




}
export default  ModificarVivienda