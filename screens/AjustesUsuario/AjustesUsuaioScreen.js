import { screenStyles } from './styles'

import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native"
import { GetEmailFromCurrentUser, GetUserDataFromEmail } from '../../database/helper'

const AjustesUsuario = ({navigation}) => {
    

    const email = GetEmailFromCurrentUser();
    const datosUser = GetUserDataFromEmail(email);


    const [User, setState] = useState({})


    const handleChangeText = (name, value) => {
        setState({...User, [name]: value});
    }





    return (
        <ScrollView>
            <View>
                <Text style={screenStyles.titleText}>
                    Modificar datos de Usuario:
                </Text>
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Nombre" 
                onChangeText={(value) => handleChangeText("nombre", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Apellidos"
                onChangeText={(value) => handleChangeText("apellidos", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Tags"
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
                 value={date}
                 mode={mode}
                 is24Hour={true}
                 display="default"
                 onChange={onChange}
               />      
                  )}
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Numero Telefono" 
                onChangeText={(value) => handleChangeText("numerotelefono", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Email" 
                onChangeText={(value) => handleChangeText("email", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Contraseña" 
                onChangeText={(value) => handleChangeText("contrasena", value)} />
            </View>
            <View style={screenStyles.button}>
                <Button color='#177013'title="Registrarse" onPress={() => RegisterUser()}/>
            </View>
        </ScrollView>
    )
}
export default AjustesUsuario