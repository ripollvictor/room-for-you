import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet} from "react-native";
import '../clases/usuario'
//import {anadirusuario} from'../database/pruebas'
import DatePicker from 'react-datepicker';
import '../database/pruebas';
import { getFirestore, collection, getDocs,doc, addDoc } from 'firebase/firestore/lite';
import firebase from '../database/firebase';
import { crearpersona } from "../clases/usuario";
import { anadirusuario } from "../database/pruebas";
//import 'react-datepicker/dist/react-datepicker.css';
import DateTimePicker from "@react-native-community/datetimepicker";
//import {DatePickerIOS} from "react-native"


    


const db = firebase.db;

const RegisterUserScreen = () => {
    const [state, setState] = useState({
        nombre:'',
        apellidos:'',
        tags:'',
        fechaNacimiento:'',
        time: new Date("2020","06","24"),
        numeroTelefono:'',
        email:'',
        contrasena:''
    });



    const [date, setDate] = useState(new Date(1598051730000));
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


    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    }
    const myDateFunction = (date) => {
        setState({...state, time: value});
      
    }

    
    

    const RegisterUser = async () => {
        if (state.nombre === '' || state.apellidos === '' || state.tags === '' || state.time === '' || state.numerotelefono === '' || state.email === ''|| state.contrasena === '' ){
            alert('Por favor rellena los campos')
        } else{
            await addDoc(collection(db,'Usuario'),{
                Apellidos: state.apellidos,
                Contrasena: state.contrasena,
                Email: state.email,
                FechaNacimiento: state.time,
                Nombre: state.nombre,
                NumeroTelefono: state.numeroTelefono,
                tags: state.tags
            });
            alert('Se ha registrado correctamente')
        }
    }
    
// selected = {this.state.time} onChanged={(value)=>handleChangeText("time" ,value)}
    return (
        <ScrollView>
            <View>
                <Text style={styles.titleText}>
                    Introduce los datos:
                </Text>
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Nombre" 
                onChangeText={(value) => handleChangeText("nombre", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Apellidos"
                onChangeText={(value) => handleChangeText("apellidos", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Tags"
                onChangeText={(value) => handleChangeText("tags", value)} />
            </View>
            <View>
                <Text style={styles.text}>
                    Fecha de nacimiento:
                </Text>
            </View>
            <View style={styles.button}>
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
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Numero Telefono" 
                onChangeText={(value) => handleChangeText("numerotelefono", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Email" 
                onChangeText={(value) => handleChangeText("email", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Contraseña" 
                onChangeText={(value) => handleChangeText("contrasena", value)} />
            </View>
            <View style={styles.button}>
                <Button color='#177013'title="Registrarse" onPress={() => RegisterUser()}/>
            </View>
        </ScrollView>
    )
}
/*
codigo  spagheti para agregar cosas

var auxus = crearpersona();
anadirusuario(auxus);
(async () => {
    const snapshot = await getDocs(collection(db,'Habitacion'));

snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});



    // all of the script.... 

})();
*/
const styles = StyleSheet.create({
    textInput:{
        flex:1,
        padding:10,
        fontSize:16,
    },
    titleText:{
        flex:1,
        padding:5,
        paddingTop: 10,
        paddingLeft:10,
        fontSize:18,
        fontWeight: "bold",
        borderTopWidth:2,
    },
    text:{
        flex:1,
        padding:5,
        paddingTop: 10,
        paddingLeft:10,
        fontSize:16
    },
    inputComponent: {
        flex:1,
        marginLeft:20,
        marginBottom:10,
        marginRight:30,
        marginTop:10,
        borderWidth:2,
        borderColor:'#cccccc'
    },
    button:{
        flex:1,
        marginRight:30,
        marginLeft:20,
        marginTop:10,
        marginBottom:10
    }
})
export default RegisterUserScreen
