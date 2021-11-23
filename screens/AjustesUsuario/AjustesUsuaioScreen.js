import { screenStyles } from './styles'

import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native"
import { GetEmailFromCurrentUser, GetUserDataFromEmail , ModificarDatosUsuaio} from '../../database/helper'
import DateTimePicker from "@react-native-community/datetimepicker";
const AjustesUsuario = ({route,navigation}) => {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setState({...state, time: currentDate});
      };

      const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
      };

      const showDatepicker = () => {
        showMode('date');
      };

    const email = GetEmailFromCurrentUser();
   // var datosUser = null;
  // console.log(route.params)
    const datosUser = route.params;
  //GetUserDataFromEmail(email);
  console.log(datosUser);
   


 
      
  const [User, setState] = useState({
    nombre:datosUser.data().Nombre,
    apellidos:datosUser.data().Apellidos,
    tags:datosUser.data().tags,
    time: datosUser.data().FechaNacimiento,
    numerotelefono:datosUser.data().NumeroTelefono,
    email:datosUser.data().Email,
    contrasena:datosUser.data().Contrasena,
    id_user: datosUser.id
})

    const handleChangeText = (name, value) => {
        setState({...User, [name]: value});
    }


        
 // value = {Vivienda.Direccion} 

    return (
        <ScrollView>
            <View>
                <Text style={screenStyles.titleText}>
                    Modificar datos de Usuario:
                </Text>
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Nombre"  value = {User.nombre}
                onChangeText={(value) => handleChangeText("nombre", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Apellidos" value = {User.apellidos}
                onChangeText={(value) => handleChangeText("apellidos", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Tags"  value ={User.tags}
                onChangeText={(value) => handleChangeText("tags", value)} />
            </View>
            <View>
                <Text style={screenStyles.text}>
                    Fecha de nacimiento:
                </Text>
            </View>
            <View style={screenStyles.button}>
                <Button color= '#7733CC' onPress={showDatepicker} title="Seleccionar Fecha" /> 
            </View>
            
            <View>
            {show && (
                 <DateTimePicker
                 testID="dateTimePicker"
                 timeZoneOffsetInMinutes={0}
                 value={User.time}
                 mode={mode}
                 is24Hour={true}
                 display="default"
                 onChange={onChange}
               />      
                  )}
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Numero Telefono"  value = {User.numerotelefono}
                onChangeText={(value) => handleChangeText("numerotelefono", value)} />
            </View>
            
            <View style={screenStyles.scrollview}>
                <Button color='#177013'title="Modificar" onPress={() => ModificarDatosUsuaio(User) }/>
                <Button color='#177013'title="Cancelar" onPress={() => history.back()}/>
            </View>
        </ScrollView>
    )
    
}



export default AjustesUsuario


/*
<View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Email" value = {User.email}
                onChangeText={(value) => handleChangeText("email", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Contraseña" 
                onChangeText={(value) => handleChangeText("contrasena", value)} />
            </View>
            */