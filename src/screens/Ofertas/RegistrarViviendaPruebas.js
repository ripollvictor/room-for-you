
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
        address: "",
        numeroPisoEscalera: "",
        metrosCuadrados: "",
        banos: "",
        numHabitaciones: "",
        imagenes: [],
        ubicacion:"",
    });



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
            console.log('Se ha registrado correctamente la prueba '+ index)

        } catch (e) {
            console.log("Error en la prueba:"+index);
        }
    }

    

    const [pruebas, setPruebas] = useState([
        {
            address: "Avenida de los Pricipes, 24",
            numeroPisoEscalera: "2",
            metrosCuadrados: "199",
            banos: "2",
            numHabitaciones: "5",
            imagenes: [],
            ubicacion: "32.1 - -0.1",
        },
        {
            address: "",
            numeroPisoEscalera: "2",
            metrosCuadrados: "199",
            banos: "2",
            numHabitaciones: "5",
            imagenes: [],
            ubicacion: "32.1 - -0.1",
        },
        {
            address: "Avenida de los Pricipes, 24",
            numeroPisoEscalera: "",
            metrosCuadrados: "199",
            banos: "2",
            numHabitaciones: "5",
            imagenes: [],
            ubicacion: "32.1 - -0.1",
        },
        {
            address: "Avenida de los Pricipes, 24",
            numeroPisoEscalera: "2",
            metrosCuadrados: "",
            banos: "2",
            numHabitaciones: "5",
            imagenes: [],
            ubicacion: "32.1 - -0.1",
        },
        {
            address: "Avenida de los Pricipes, 24",
            numeroPisoEscalera: "2",
            metrosCuadrados: "199",
            banos: "",
            numHabitaciones: "5",
            imagenes: [],
            ubicacion: "32.1 - -0.1",
        },
        {
            address: "Avenida de los Pricipes, 24",
            numeroPisoEscalera: "2",
            metrosCuadrados: "199",
            banos: "2",
            numHabitaciones: "",
            imagenes: [],
            ubicacion: "32.1 - -0.1",
        },
        {
            address: "Avenida de los Pricipes, 24",
            numeroPisoEscalera: "2",
            metrosCuadrados: "199",
            banos: "2",
            numHabitaciones: "5",
            imagenes: [],
            ubicacion: "",
        },
        {
            address: "",
            numeroPisoEscalera: "",
            metrosCuadrados: "",
            banos: "",
            numHabitaciones: "",
            imagenes: "",
            ubicacion: "",
        },
        {
            address: null,
            numeroPisoEscalera: null,
            metrosCuadrados: null,
            banos: null,
            numHabitaciones: null,
            imagenes: null,
            ubicacion: null,
        }

    ])


    const ejecutarPrueba = () => {
        setIndex(index + 1)
    }

    let [index, setIndex] = useState(-1)

    useEffect(() => {
        if (index >= 0 && index < pruebas.length)
            RegisterVivienda()
            ejecutarPrueba()
    }, [state])

    useEffect(() => {
        if (index >= 0)
            setState(pruebas[index])
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
