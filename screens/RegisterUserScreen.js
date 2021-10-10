import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import '../clases/usuario'
//import {anadirusuario} from'../database/pruebas'
import '../database/pruebas'
import { getFirestore, collection, getDocs,doc, addDoc } from 'firebase/firestore/lite';
import firebase from '../database/firebase'
import { crearpersona } from "../clases/usuario";
import { anadirusuario } from "../database/pruebas";

const db = firebase.db;

const RegisterUserScreen = () => {
    const [state, setState] = useState({
        nombre:'',
        apellidos:'',
        tags:'',
        fechanacimiento:'',
        numerotelefono:'',
        email:'',
        contrasena:''
    });

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    }

    const RegisterUser = async () => {
        if (state.nombre === '' || state.apellidos === '' || state.tags === '' || state.fechanacimiento === '' || state.numerotelefono === '' || state.email === ''|| state.contrasena === '' ){
            alert('Por favor rellena los campos')
        } else{
            await addDoc(collection(db,'Usuario'),{
                Apellidos: state.apellidos,
                Contrasena: state.contrasena,
                Email: state.email,
                Fechanacimiento: Date(1995,11,17),
                Nombre: state.nombre,
                Numerotelefono: state.numerotelefono,
                tags: state.tags
            });
            alert('Se ha registrado correctamente')
        }
    }

    return (
        <ScrollView>
            <View>
                <Text>
                    Register User
                </Text>
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Nombre" 
                onChangeText={(value) => handleChangeText("nombre", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Apellidos"
                onChangeText={(value) => handleChangeText("apellidos", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Tags"
                onChangeText={(value) => handleChangeText("tags", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Fecha Nacimiento" 
                onChangeText={(value) => handleChangeText("fechanacimiento", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Numero Telefono" 
                onChangeText={(value) => handleChangeText("numerotelefono", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Email" 
                onChangeText={(value) => handleChangeText("email", value)} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Contraseña" 
                onChangeText={(value) => handleChangeText("contrasena", value)} />
            </View>
            <View>
                <Button title="Registrarse" onPress={() => RegisterUser()}/>
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
    container: {
        flex: 1,
        padding: 35
    },
    inputComponent: {
        flex:1,
        padding:0,
        margin:10,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'
    }
})
export default RegisterUserScreen
