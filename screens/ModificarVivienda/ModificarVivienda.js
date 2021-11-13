import { screenStyles } from './styles'

import React from "react"
import { View, Text, TextInput, Button, ScrollView } from "react-native"
import { IniciarConGoogle, CerrarSesion, DebugDB } from '../../database/helper'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

import Button from "../../components/Button/Button"
import {getViviendaconid , listaVivienda, modificarVivienda}from "../../database/funcionesfirebase"

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

return(
    <ScrollView>
            <View>
                <Text style={screenStyles.titleText}>
                    Datos de la vivienda:
                </Text>
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Numero de baños" Text = {Vivienda.Banos} 
                onChangeText={(value) => handleChangeText("Banos", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Dirección" Text = {Vivienda.Direccion} 
                onChangeText={(value) => handleChangeText("Direccion", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Escalera, piso y puerta" Text = {Vivienda.EscaleraPisoPuerta} 
                onChangeText={(value) => handleChangeText("EscaleraPisoPuerta", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Metros Cuadrados" Text = {Vivienda.MetrosCuadrados} 
                onChangeText={(value) => handleChangeText("MetrosCuadrados", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Numero de habitaciones" Text = {Vivienda.NumHabitaciones} 
                onChangeText={(value) => handleChangeText("NumHabitaciones", value)} />
            </View>
            <View style={screenStyles.button}>
                <Button color='#177013'title="Modificar" onPress={() => modificarVivienda(Vivienda)}/>
            </View>
    </ScrollView>
)
}
export default  ModificarVivienda