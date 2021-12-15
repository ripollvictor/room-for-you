import { screenStyles } from './styles'

import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker'
import { View, Picker, Text, TextInput, Button, ScrollView, StyleSheet, Alert, Platform } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import firebase from '../../database/firebase'
import { getFirestore, collection, getDocs, doc, addDoc } from 'firebase/firestore/lite';
import { map, size, filter } from "lodash"
import { subirArchivo } from "../../database/helper";


const db = firebase.db;

const RegistrarViviendaScreen = () => {
    const [state, setState] = useState({
        tipo: "",
        address: "",
        numeroPisoEscalera: "",
        metrosCuadrados: "",
        banos: "",
        numHabitaciones: "",
        imagenes: []
    });

    /*
        const CargarImagenBD = async () => {
            const imagenesUrl = []
            await Promise.all(
                map(imagenesSeleccionadas, async(image) => {
                    const respuesta = await CargarImagen(image, "ImagenesViviendas", uuid())
                    //if(respuesta.stat)
                })
            )
        }
    */
    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Debes dar acceso a la galería para poder subir imágenes');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        const respuesta = { status: false, image: null, base64: null }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
            base64: true,
        });

        if (result.cancelled) { return respuesta; }
        respuesta.status = true;
        respuesta.image = result.uri;
        respuesta.base64 = result.base64;
        return respuesta;
    };
    const eliminarImagen = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        setImagenesSeleccionadas(
                            filter(imagenesSeleccionadas, (imageURL) => imageURL !== image)
                        )
                    }
                }
            ],
            { cancelable: true }
        )
    }
    function CargarImagen({ imagenesSeleccionadas, setImagenesSeleccionadas }) {
        const selectImagen = async () => {
            const respuesta = await pickImage()
            if (!respuesta.status) {
                alert('No has seleccionado ninguna Imagen')
                return
            }
            setImagenesSeleccionadas([...imagenesSeleccionadas, respuesta.image])
        }
        return (
            <ScrollView horizontal>
                {
                    size(imagenesSeleccionadas) < 10 && (
                        <Icon
                            style={screenStyles.selecionarImagen}
                            tipo="material-community"
                            name="camera"
                            onPress={selectImagen}
                        >
                        </Icon>
                    )
                }
                {
                    map(imagenesSeleccionadas, (imagenPiso, index) => (
                        <Avatar
                            style={screenStyles.miniatureStyle}
                            key={index}
                            source={{ uri: imagenPiso }}
                            onPress={() => eliminarImagen(imagenPiso)}
                        />
                    )
                    )
                }
            </ScrollView>
        )
    }
    function handleChangeText(name, value) {
        setState({ ...state, [name]: value });
    }

    const RegisterVivienda = async () => {
        try {
            const urlImagenes = [];
            for (const img of imagenesSeleccionadas) {
                const urlImg = await subirArchivo(img)
                urlImagenes.push(urlImg)
            }
            console.log("Estas son las img"+urlImagenes);

            await addDoc(collection(db, 'Vivienda'), {
                Direccion: state.address,
                EscaleraPisoPuerta: state.numeroPisoEscalera,
                MetrosCuadrados: state.metrosCuadrados,
                Banos: state.banos,
                NumHabitaciones: state.numHabitaciones,
                Imagenes: urlImagenes,
                FechaRegistro: new Date(),
                Ubicacion: "",
                id_usuario:""
            });
        } catch (e) {
            console.log("Error:", e);
        }
        alert('Se ha registrado correctamente')
    }

    return (
        <ScrollView>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Dirección"
                    onChangeText={(value => handleChangeText("address", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Piso - Escalera - Puerta"
                    onChangeText={(value => handleChangeText("numeroPisoEscalera", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Metros Cuadrados"
                    onChangeText={(value => handleChangeText("metrosCuadrados", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Baños"
                    keyboardType="numeric"
                    onChangeText={(value => handleChangeText("banos", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput
                    style={screenStyles.textInput}
                    placeholder="Habitaciones disponibles"
                    keyboardType="numeric"
                    onChangeText={(value => handleChangeText("numHabitaciones", value))} />
            </View>

            <CargarImagen
                setImagenesSeleccionadas={setImagenesSeleccionadas}
                imagenesSeleccionadas={imagenesSeleccionadas}
            />
            <View>
                <Button title="Registrarse" onPress={() => RegisterVivienda()} />
            </View>
        </ScrollView>
    )
}



export default RegistrarViviendaScreen
