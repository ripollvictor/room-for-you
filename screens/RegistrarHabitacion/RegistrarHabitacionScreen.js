import { screenStyles } from './styles'

import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native"
import { IniciarConGoogle, CerrarSesion, DebugDB } from '../../database/helper'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

import {anadirHabitacion}from "../../database/funcionesfirebase"

const RegistrarHabitacion = ({route,navigation}) => {
    // pasar el id de la vivienda
    const idvivienda= route.params.popu;
    console.log(idvivienda);
 
    const [Habitacion, setState] = useState({
        Caracteristicas: "",
        Estado: 0,
        MetrosCuadrados: 0,
        Precio: 0,
        id_vivienda: idvivienda
    })
    const handleChangeText = (name, value) => {
        setState({...Habitacion, [name]: value});
    }

return(
    <ScrollView>
            <View>
                <Text style={screenStyles.titleText}>
                    Registrar Habitacion:
                </Text>
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Caracteristicas" 
                onChangeText={(value) => handleChangeText("Caracteristicas", value)} />
            </View>  
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Metros Cuadrados"
                onChangeText={(value) => handleChangeText("MetrosCuadrados", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Precio" 
                onChangeText={(value) => handleChangeText("Precio", value)} />
            </View>
            <View style={screenStyles.button}>
                <Button color='#177013'title="Añadir Habitacion" onPress={() =>{anadirHabitacion(Habitacion)}}/>
            </View>
    </ScrollView>
)
}//
export default  RegistrarHabitacion