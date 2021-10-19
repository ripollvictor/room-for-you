import React, { useState } from "react";

import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { View, Text, Picker, TextInput, Button, ScrollView, StyleSheet, Alert} from "react-native";
import {} from "react-native-imagepicker"
import {Icon, Avatar} from "react-native-elements";
//import {anadirusuario} from'../database/pruebas'
import '../database/pruebas'
import firebase from '../database/firebase'
import { getFirestore, collection, getDocs,doc, addDoc } from 'firebase/firestore/lite';
import {map, size} from "lodash"

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
        imageFirebase: "",
        imagenesSeleccionadas:[]
    });

    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);

//     var img 
//    const selectFile = () => {

//         var options = {
    
//           title: 'Select Image',
    
//           customButtons: [
    
//             { 
    
//               name: 'customOptionKey', 
    
//               title: 'Choose file from Custom Option' 
    
//             },
    
//           ],
    
//           storageOptions: {
    
//             skipBackup: true,
    
//             path: 'images',
    
//           },
    
//         };
//         console.log('hola ')
//         ImagePicker.launchImageLibraryAsync(options, res => {
//             console.log('Response = ', res);

            
      
//               let source = res;
      
//               this.setState({
      
//                 resourcePath: source,
      
//               });

//                     console.log(source)
      
            
      
//           });
    
//       };
      
    const selectImagenGaleria = async(array) => {
        const respuesta = {status: false, image: null}
        const resultPermisos = await Permissions.askAsync(Permissions.CAMERA)
        if (resultPermisos.status == "denied"){
            alert("Debes dar acceso a la galería para poder subir imágenes")
            return respuesta
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: array
        })
        
        if(result.cancelled) {return respuesta}
        respuesta.status = true
        respuesta.image = result.uri
        return respuesta
        
    }

    function SubirImagen ({imagenesSeleccionadas, setImagenesSeleccionadas}) {
        const selectImagen = async() => {
            const respuesta = await selectImagenGaleria([4,4])
            if(!respuesta.status) {
                alert('No has seleccionado ninguna imagen')
                return
            }
            setImagenesSeleccionadas([...imagenesSeleccionadas, respuesta.image])
        }
        console.log(imagenesSeleccionadas)
        return(
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
                            source={{uri: imagenPiso}}
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
                <Button title="Foto" onPress={() => selecImagenGaleria()} />
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
        marginTop:30

    },
    miniatureStyle: {
        width:70,
        height:70,
        marginRight:10
    }


})

export default RegistrarViviendaScreen