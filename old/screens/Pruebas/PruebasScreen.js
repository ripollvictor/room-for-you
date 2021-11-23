import { screenStyles } from './styles'

import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView} from "react-native"
import { IniciarConGoogle, CerrarSesion, DebugDB } from '../../database/helper'
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

import {eliminarVivienda,habitacionSetEstadoOcupada,habitacionSetEstadoLibre,anadirCompaneroalPiso, eliminarCompanerobyidTabla,getViviendaconidvivieda}from "../../database/funcionesfirebase"

const Pruebas = ({navigation}) => {

  
 
    const [Datos, setState] = useState({
        idvivienda: "",
        idhabitacion: "",
        idusuario:"",
        idvivienda1: "",
        idcompanero:"",
        idvivienda2:""


    })
    const handleChangeText = (name, value) => {
        setState({...Datos, [name]: value});
    }

return(
    <ScrollView>
            <View>
                <Text style={screenStyles.titleText}>
                    Pruebas Congratuladas por Popu:
                </Text>
            </View>
            <View style={screenStyles.scrollview}>
               <Button type="button"  color='#177013'title="Eliminar Vivienda" onPress={() =>{eliminarVivienda(Datos.idvivienda)}}/>
              <TextInput style={screenStyles.textInput}  placeholder="Pon la id de la vivienda" 
                onChangeText={(value) => handleChangeText("idvivienda", value)} />          
            </View>  
            <View style={screenStyles.scrollview}>
               <Button type="button"  color='#177013'title="Modificar Estado Habitacion a 0" onPress={() =>{habitacionSetEstadoLibre(Datos.idhabitacion)}}/>
              <TextInput style={screenStyles.textInput} placeholder="Pon la id de la Habitacion" 
                onChangeText={(value) => handleChangeText("idhabitacion", value)} />          
            </View>  
            <View style={screenStyles.scrollview}>
               <Button type="button"  color='#177013'title="Modificar Estado Habitacion a 1" onPress={() =>{habitacionSetEstadoOcupada(Datos.idhabitacion)}}/>
              <TextInput style={screenStyles.textInput} placeholder="Pon la id de la Habitacion" 
                onChangeText={(value) => handleChangeText("idhabitacion", value)} />          
            </View>  
            <View style={screenStyles.scrollview}>
               <Button type="button"  color='#177013'title="Añadir Compañero" onPress={() =>{anadirCompaneroalPiso(Datos.idusuario,Datos.idvivienda1)}}/>
              <TextInput style={screenStyles.textInput} placeholder="Pon la id del compañero" 
                onChangeText={(value) => handleChangeText("idusuario", value)} /> 
                <TextInput style={screenStyles.textInput} placeholder="Pon el id de la vivienda" 
                onChangeText={(value) => handleChangeText("idvivienda1", value)} />           
            </View>
            <View style={screenStyles.scrollview}>
               <Button type="button"  color='#177013'title="Eliminar Compañero" onPress={() =>{eliminarCompanerobyidTabla(Datos.idcompanero)}}/>
              <TextInput style={screenStyles.textInput} placeholder="Pon la id de la tabla Compañero" 
                onChangeText={(value) => handleChangeText("idcompanero", value)} />          
            </View>  
            <View style={screenStyles.scrollview}>

            <Button type="button"  color='#177013'title="ModificarVivienda"  onPress={() => { getViviendaconidvivieda(Datos.idvivienda2).then((vivienda)=>{
                console.log(vivienda.data());
                navigation.navigate("ModificarVivienda",{vivienda});
            })}}/>
            <TextInput style={screenStyles.textInput} placeholder="Pon la id de la Vivienda a modificar" 
                onChangeText={(value) => handleChangeText("idvivienda2", value)} /> 
            </View>

    </ScrollView>
)
}//
export default  Pruebas