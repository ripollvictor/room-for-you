import { screenStyles } from './styles'

import React from "react"
import { View, Image, Text } from "react-native"
import { IniciarConGoogle, CerrarSesion, DebugDB } from '../../database/helper'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

import Button from "../../components/Button/Button"
import {getViviendaconid , listaVivienda}from "../../database/funcionesfirebase"

const ModificarVivienda = ({navigation,vivienda}) => {
    
    
    const [Vivienda, setCredentials] = useState({
        Banos: vivienda.data().Banos,
        Direccion: vivienda.data().Direccion,
        EscaleraPisoPuerta: vivienda.data().EscaleraPisoPuerta,
        FechaRegistro: vivienda.data().FechaRegistro, // no se edita
        Imagenes: vivienda.data().Imagenes, //no se edita
        MetrosCuadrados: vivienda.data().MetrosCuadrados,
        NumHabitaciones: vivienda.data().NumHabitaciones,
        Ubicacion: vivienda.data().Ubicacion, //de momento se deja igual
        id_usuario: vivienda.data().id_usuario, // no se edita
        id_vivienda: vivienda.id // no se edita
    })
    const handleChangeText = (name, value) => {
        setState({...Vivienda, [name]: value});
    }




}
export default  ModificarVivienda