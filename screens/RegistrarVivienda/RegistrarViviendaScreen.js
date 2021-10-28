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
        numero: "",
        piso: "",
        escalera: "",
        metrosCuadrados: "",
        banos: "",
        puerta: ""
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
        const respuesta = { status: false, image: null }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.cancelled) { return respuesta; }
        respuesta.status = true;
        respuesta.image = result.uri;
        return respuesta
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
        console.log(imagenesSeleccionadas)
        return (
            <ScrollView horizontal>
                {
                    size(imagenesSeleccionadas) < 10 && (
                        <Icon
                            style={styles.selecionarImagen}
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
                            style={styles.miniatureStyle}
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
        try{
            await subirArchivo(imagenesSeleccionadas[0])
        } catch (e) {
            console.log("Error:", e);
        }


        alert('Se ha registrado correctamente')
    }



    return (
        <ScrollView>

            <View style={screenStyles.inputComponent}>
                <Picker style={screenStyles.pickerInput}
                    selectedValue={state.tipo}
                    onValueChange={(itemValue, itemIndex) =>
                        handleChangeText("tipo", itemValue)
                    }>
                    <Picker.Item label="Piso" value="Piso" />
                    <Picker.Item label="Adosado" value="Adosado" />
                    <Picker.Item label="Chalet" value="Chalet" />

                </Picker>
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Dirección"
                    onChangeText={(value => handleChangeText("address", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Numero"
                    onChangeText={(value => handleChangeText("numero", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Piso"
                    onChangeText={(value => handleChangeText("piso", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Puerta"
                    onChangeText={(value => handleChangeText("puerta", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Escalera"
                    onChangeText={(value => handleChangeText("escalera", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Metros Cuadrados"
                    onChangeText={(value => handleChangeText("metrosCuadrados", value))} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Baños"
                    onChangeText={(value => handleChangeText("banos", value))} />
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
