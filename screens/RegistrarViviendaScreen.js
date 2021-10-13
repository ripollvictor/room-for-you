import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import '../clases/usuario'
//import {anadirusuario} from'../database/pruebas'
import '../database/pruebas'
import firebase from '../database/firebase'
import { getFirestore, collection, getDocs,doc, addDoc } from 'firebase/firestore/lite';
import { crearpersona } from "../clases/usuario";
import { anadirusuario } from "../database/pruebas";

const db = firebase.db;


const RegistrarViviendaScreen = () => {
    const [state, setState] = useState({
        tipo: "",
        address: "",
        numero: "",
        piso: "",
        escalera: "",
        metrosCuadrados: "",
        banos: "", 
        puerta: ""
    });

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value });
    }

    const RegisterVivienda = async () => {
        await addDoc(collection(db, 'Vivienda'), {
            Tipo: state.tipo,
            Address: state.address,
            Numero: state.numero,
            Piso: state.piso,
            Escalera: state.escalera,
            MetrosCuadrados: state.metrosCuadrados,
            Banos: state.banos,
            Puerta: state.puerta

        });
        alert('Se ha registrado correctamente')

    }

    return (
        <ScrollView>
            <View>
                <Text>
                    Registrar Vivienda/Habitación
                </Text>
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Tipo"
                    onChangeText={(value => handleChangeText("tipo", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Dirección"
                    onChangeText={(value => handleChangeText("address", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Numero"
                    onChangeText={(value => handleChangeText("numero", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Piso"
                    onChangeText={(value => handleChangeText("piso", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Puerta"
                    onChangeText={(value => handleChangeText("puerta", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Escalera"
                    onChangeText={(value => handleChangeText("escalera", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Metros Cuadrados"
                    onChangeText={(value => handleChangeText("metrosCuadrados", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Baños"
                    onChangeText={(value => handleChangeText("banos", value))} />
            </View>
            <View>
                <Button title="Registrarse" onPress={() => RegisterVivienda()} />
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
    inputComponent: {
        flex: 1,
        padding: 0,
        margin: 10,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }

})

export default RegistrarViviendaScreen