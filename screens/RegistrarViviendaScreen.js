import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import firebase from '../database/firebase'
import { getFirestore, collection, getDocs, doc, addDoc } from 'firebase/firestore/lite';

import { Permissions, ImagePicker } from "react-native";

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
        puerta: "",
        imageFirebase: ""
    });

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value });
    }

    uploadImage = uri => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    resolve(xhr.response);
                }
            };
            xhr.open("GET", uri);
            xhr.responseType = "blob";
            xhr.send();
        });
    };

    openGallery = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        if (resultPermission) {
            const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });
            if (resultImagePicker.cancelled === false) {
                const imageUri = resultImagePicker.uri;
                const { address } = this.state;

                this.uploadImage(imageUri)
                    .then(resolve => {
                        let ref = firebase
                            .storage()
                            .ref()
                            .child(`images/${address}`);
                        ref
                            .put(resolve)
                            .then(resolve => {
                                console.log("Imagen subida correctamente");
                            })
                            .catch(error => {
                                console.log("Error al subir la imagen");
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    };

    loadImage = async () => {
        const { address } = this.state;

        firebase
            .storage()
            .ref(`images/${address}`)
            .getDownloadURL()
            .then(resolve => {
                this.setState({
                    imageFirebase: resolve
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    checkImage = () => {
        const { imageFirebase } = this.state;

        if (imageFirebase) {
            return (
                <Image
                    style={{ width: 300, height: 300 }}
                    source={{ uri: imageFirebase }}
                />
            );
        }
        return null;
    };

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
            <View>
                <Button title="Subir imagenes" onPress={() => openGallery()} />
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
    }

})

export default RegistrarViviendaScreen