import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker'
import { View, Text, Picker, TextInput, Button, ScrollView, StyleSheet, Alert, Platform } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import firebase from '../database/firebase'
import { getFirestore, collection, getDocs, doc, addDoc } from 'firebase/firestore/lite';
import { map, size, filter } from "lodash"

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
        const subirImagenBD = async () => {
            const imagenesUrl = []
            await Promise.all(
                map(imagenesSeleccionadas, async(image) => {
                    const respuesta = await SubirImagen(image, "ImagenesViviendas", uuid())
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
            const respuesta = {status: false, image: null}
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (result.cancelled) {return respuesta;}
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
        function SubirImagen({ imagenesSeleccionadas, setImagenesSeleccionadas }) {
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
        const respuesta = await subirImagenBD()
        alert('Se ha registrado correctamente')

    }



    return (
        <ScrollView>

            <View style={styles.inputComponent}>
                <Picker style={styles.pickerInput}
                    selectedValue={state.tipo}
                    onValueChange={(itemValue, itemIndex) =>
                        handleChangeText("tipo", itemValue)
                    }>
                    <Picker.Item label="Piso" value="Piso" />
                    <Picker.Item label="Adosado" value="Adosado" />
                    <Picker.Item label="Chalet" value="Chalet" />

                </Picker>
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Dirección"
                    onChangeText={(value => handleChangeText("address", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Numero"
                    onChangeText={(value => handleChangeText("numero", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Piso"
                    onChangeText={(value => handleChangeText("piso", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Puerta"
                    onChangeText={(value => handleChangeText("puerta", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Escalera"
                    onChangeText={(value => handleChangeText("escalera", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Metros Cuadrados"
                    onChangeText={(value => handleChangeText("metrosCuadrados", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput style={styles.textInput} placeholder="Baños"
                    onChangeText={(value => handleChangeText("banos", value))} />
            </View>

            <SubirImagen
                setImagenesSeleccionadas={setImagenesSeleccionadas}
                imagenesSeleccionadas={imagenesSeleccionadas}
            />
            <View>
                <Button title="Registrarse" onPress={() => RegisterVivienda()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pickerInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    textInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    titleText: {
        flex: 1,
        padding: 5,
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
        borderTopWidth: 2,
    },
    text: {
        flex: 1,
        padding: 5,
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 16
    },
    inputComponent: {
        flex: 1,
        marginLeft: 20,
        marginBottom: 10,
        marginRight: 30,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#cccccc'
    },
    selecionarImagen: {
        height: 70,
        width: 79,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        backgroundColor: "#e3e3e3"
    },
    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30

    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    }


})

export default RegistrarViviendaScreen