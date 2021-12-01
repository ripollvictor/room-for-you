
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker'
import { View, Picker, Text, TextInput, Button, ScrollView, StyleSheet, Alert, Platform } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import firebase from '../../../old/database/firebase';
import { getFirestore, collection, getDocs, doc, addDoc } from 'firebase/firestore/lite';
import { map, size, filter } from "lodash"
import { subirArchivo } from "../../database/helper";


const db = firebase.db;

const RegistrarViviendaPruebas = () => {
    const [state, setState] = useState({
        tipo: "",
        address: "",
        numeroPisoEscalera: "",
        metrosCuadrados: "",
        banos: "",
        numHabitaciones: "",
        imagenes: []
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const RegisterVivienda = async () => {
        try {
            if(state.address === "" || state.metrosCuadrados === "" || state.banos ==="" || state.numHabitaciones === "") {throw new Exception();}
            await addDoc(collection(db, 'Vivienda'), {
                Direccion: state.address,
                EscaleraPisoPuerta: state.numeroPisoEscalera,
                MetrosCuadrados: state.metrosCuadrados,
                Banos: state.banos,
                NumHabitaciones: state.numHabitaciones,
                Imagenes: state.imagenes,
                FechaRegistro: new Date(),
                Ubicacion: "",
                id_usuario:""
            });
        } catch (e) {
            console.log("Error en la prueba:"+index, e);
        }
        alert('Se ha registrado correctamente la prueba '+ index)
    }

    

    const [pruebas, setPruebas] = useState([
        {
            Direccion: "Avenida de los Pricipes, 24",
            EscaleraPisoPuerta: "2",
            MetrosCuadrados: "199",
            Banos: "2",
            NumHabitaciones: "5",
            Imagenes: "upps",
            Ubicacion: "32.1 - -0.1",
        },
        {
            Direccion: "",
            EscaleraPisoPuerta: "2",
            MetrosCuadrados: "199",
            Banos: "2",
            NumHabitaciones: "5",
            Imagenes: "upps",
            Ubicacion: "32.1 - -0.1",
        },
        {
            Direccion: "Avenida de los Pricipes, 24",
            EscaleraPisoPuerta: "",
            MetrosCuadrados: "199",
            Banos: "2",
            NumHabitaciones: "5",
            Imagenes: "upps",
            Ubicacion: "32.1 - -0.1",
        },
        {
            Direccion: "",
            EscaleraPisoPuerta: "",
            MetrosCuadrados: "",
            Banos: "",
            NumHabitaciones: "",
            Imagenes: "",
            FechaRegistro: new Date(),
            Ubicacion: "",
            id_usuario: "ALSKEJJNS",
        },
        {
            Direccion: "",
            EscaleraPisoPuerta: "",
            MetrosCuadrados: "",
            Banos: "",
            NumHabitaciones: "",
            Imagenes: "",
            FechaRegistro: new Date(),
            Ubicacion: "",
            id_usuario: "ALSKEJJNS",
        },
        {
            Direccion: "",
            EscaleraPisoPuerta: "",
            MetrosCuadrados: "",
            Banos: "",
            NumHabitaciones: "",
            Imagenes: "",
            FechaRegistro: new Date(),
            Ubicacion: "",
            id_usuario: "ALSKEJJNS",
        },
        {
            Direccion: "",
            EscaleraPisoPuerta: "",
            MetrosCuadrados: "",
            Banos: "",
            NumHabitaciones: "",
            Imagenes: "",
            FechaRegistro: new Date(),
            Ubicacion: "",
            id_usuario: "ALSKEJJNS",
        },
        {
            Direccion: "",
            EscaleraPisoPuerta: "",
            MetrosCuadrados: "",
            Banos: "",
            NumHabitaciones: "",
            Imagenes: "",
            FechaRegistro: new Date(),
            Ubicacion: "",
            id_usuario: "ALSKEJJNS",
        }
    ])


    const ejecutarPrueba = () => {
        setIndex(index + 1)
    }

    let [index, setIndex] = useState(-1)

    useEffect(() => {
        if (index >= 0 && index < pruebas.length - 1)
            RegisterVivienda()
    }, [state])

    useEffect(() => {
        if (index >= 0)
            setState(pruebas[index])
            console.log(index)
    }, [index])

    


    return (
        <ScrollView>
            <View>
                <Text>
                    Probar a Registrar Viviendas con diferentes formatos y null en sus campos:
                </Text>
            </View>
            <View>
                <Button color='#177013'title="RegistrarViviendaPrueba" onPress={() => ejecutarPrueba()}/>
            </View>
        </ScrollView>
    )
}
export default RegistrarViviendaPruebas
