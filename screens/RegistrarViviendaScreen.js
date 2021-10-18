import React, { useState } from "react";
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert} from "react-native";
import {} from "react-native-imagepicker"
import {Icon, Avatar} from "react-native-elements";
import '../clases/usuario'
//import {anadirusuario} from'../database/pruebas'
import '../database/pruebas'
import firebase from '../database/firebase'
import { getFirestore, collection, getDocs,doc, addDoc } from 'firebase/firestore/lite';
import { crearpersona } from "../clases/usuario";
import { anadirusuario } from "../database/pruebas";
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
        puerta: ""
    });

    var img = new Image();

   const selectFile = () => {

        var options = {
    
          title: 'Select Image',
    
          customButtons: [
    
            { 
    
              name: 'customOptionKey', 
    
              title: 'Choose file from Custom Option' 
    
            },
    
          ],
    
          storageOptions: {
    
            skipBackup: true,
    
            path: 'images',
    
          },
    
        };
    
        ImagePicker.launchImageLibraryAsync(options, res => {
            console.log('Response = ', res);

            if (res.didCancel) {

              console.log('User cancelled image picker');
      
            } else if (res.error) {
      
              console.log('ImagePicker Error: ', res.error);
      
            } else if (res.customButton) {
      
              console.log('User tapped custom button: ', res.customButton);
      
              alert(res.customButton);
      
            } else {
      
              let source = res;
      
              this.setState({
      
                resourcePath: source,
      
              });

              img.src(source)
      
            }
      
          });
    
      };

    // const selecImagenGaleria = async(array) => {
    //     const respuesta = {status: false, image: null}
    //     const resultPermisos = await Permissions.askAsync(Permissions.CAMERA)
    //     if (resultPermisos.status == "denied"){
    //         alert("Debes dar acceso a la galería para poder subir imágenes")
    //         return respuesta
    //     }
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         aspect: array
    //     })
    //     if(result.cancelled) {return respuesta}
    //     respuesta.status = true
    //     respuesta.image = result.uri
    //     return respuesta
    // }

    // const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([])

    // function SubirImagen ({imagenesSeleccionadas, setImagenesSeleccionadas}) {
    //     const selecImagen = async() => {
    //         const respuesta = await selecImagenGaleria([4,4])
    //         if(respuesta.status == false) {
    //             alert('No has seleccionado ninguna imagen')
    //             return
    //         }
    //         setImagenesSeleccionadas([...imagenesSeleccionadas, respuesta.image])
    //     }
    //     return(
    //         <ScrollView horizontal>
    //             {
    //                 size(imagenesSeleccionadas) < 10 && (
    //                     <Icon 
    //                          style={styles.selecionarImagen}
    //                          tipo="material-community" 
    //                          name="camera" 
    //                          onPress={selecImagen}
    //                          > 
    //                     </Icon>
    //                 )
    //             }
    //             {
    //                 map(imagenesSeleccionadas, (imagenPiso, index) => (
    //                     <Avatar
    //                         style={styles.selecionarImagen}
    //                         key={index}
    //                         source={{uri: imagenPiso}}
    //                     />
    //                 )
    //                 )
    //             }
                
                
    //         </ScrollView>
    //     )
    // }

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
            
            {/* <SubirImagen
                setImagenesSeleccionadas={setImagenesSeleccionadas}
                imagenesSeleccionadas={imagenesSeleccionadas}
                onPress={SubirImagen}
            /> */}
            <View>
                <Button title="Foto" onPress={() => selectFile()} />
            </View>
            <View>
                
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
    },
    selecionarImagen: {
        height: 70,
        width: 79,
        alignItems: "center",
        justifyContent: "center"
    }


})

export default RegistrarViviendaScreen