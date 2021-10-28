import { screenStyles } from './styles'

import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import '../../clases/usuario'
//import {anadirusuario} from'../database/pruebas'
import DatePicker from 'react-datepicker';
//import '../../database/pruebas';
import { getFirestore, collection, getDocs,doc, addDoc,setDoc } from 'firebase/firestore/lite';
import firebase from '../../database/firebase';
import { crearpersona } from "../../clases/usuario";
//import { anadirusuario } from "../../database/pruebas";
//import 'react-datepicker/dist/react-datepicker.css';
import DateTimePicker from "@react-native-community/datetimepicker";
//import {DatePickerIOS} from "react-native"
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword,updateProfile, update} from "firebase/auth";

    


const db = firebase.db;

const RegistrarUsuarioScreen = () => {
    const [state, setState] = useState({
        nombre:'',
        apellidos:'',
        tags:'',
        fechaNacimiento:'',
        time: new Date("2020","06","24"),
        numerotelefono:'',
        email:'',
        contrasena:''
    });



    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setState({...state, time: currentDate});
      };

      const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
      };

      const showDatepicker = () => {
        showMode('date');
      };


    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    }
    const myDateFunction = (date) => {
        setState({...state, time: value});
      
    }
/*
    const auth = getAuth();
    const user = auth.currentUser;
    updateProfile()
*/
    

    const RegisterUser = async () => {
        if (state.nombre === '' || state.apellidos === '' || state.tags === '' ||  state.numerotelefono === '' || state.email === ''|| state.contrasena === '' ){
            alert('Por favor rellena los campos')
        } else{

            try{

            Registroconemail(state.email,state.contrasena);     
            
            await addDoc(collection(db,'Usuario'),{
                Apellidos: state.apellidos,
                Contrasena: state.contrasena,
                Email: state.email,
                FechaNacimiento: state.time,
                Nombre: state.nombre,
                NumeroTelefono: state.numerotelefono,
                tags: state.tags
            });

            alert('Se ha registrado correctamente')
        }catch(error){
            console.log("pene");
            console.error(error);
        }
        }
    }


    const Registroconemail = (email,password) => {
        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
        
        };
    
// selected = {this.state.time} onChanged={(value)=>handleChangeText("time" ,value)}
    return (
        <ScrollView>
            <View>
                <Text style={screenStyles.titleText}>
                    Introduce los datos:
                </Text>
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Nombre" 
                onChangeText={(value) => handleChangeText("nombre", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Apellidos"
                onChangeText={(value) => handleChangeText("apellidos", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Tags"
                onChangeText={(value) => handleChangeText("tags", value)} />
            </View>
            <View>
                <Text style={screenStyles.text}>
                    Fecha de nacimiento:
                </Text>
            </View>
            <View style={screenStyles.button}>
                <Button color= '#7733CC' onPress={showDatepicker} title="Seleccionar Fecha" />
            </View>
            
            <View>
            {show && (
                 <DateTimePicker
                 testID="dateTimePicker"
                 timeZoneOffsetInMinutes={0}
                 value={date}
                 mode={mode}
                 is24Hour={true}
                 display="default"
                 onChange={onChange}
               />      
                  )}
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Numero Telefono" 
                onChangeText={(value) => handleChangeText("numerotelefono", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Email" 
                onChangeText={(value) => handleChangeText("email", value)} />
            </View>
            <View style={screenStyles.inputComponent}>
                <TextInput style={screenStyles.textInput} placeholder="Contraseña" 
                onChangeText={(value) => handleChangeText("contrasena", value)} />
            </View>
            <View style={screenStyles.button}>
                <Button color='#177013'title="Registrarse" onPress={() => RegisterUser()}/>
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

export default RegistrarUsuarioScreen
