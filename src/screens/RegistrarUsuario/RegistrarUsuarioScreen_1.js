import { screenStyles } from './styles'
import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { getFirestore, collection, getDocs, doc ,addDoc, query,where,deleteDoc,setDoc,getDoc,updateDoc} from 'firebase/firestore/lite';
import firebase from '../../../old/database/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword,updateProfile, update} from "firebase/auth";
import { async } from '@firebase/util';

const db = firebase.db;

const RegistrarUsuario1Screen = () => {
    const [state, setState] = useState({
        nombre:'',
        apellidos:'',
        tags:'',
        fechaNacimiento:'',
        time: new Date("2020","02","22"),
        numerotelefono:'',
        email:'',
        contrasena:''
    });

    const RegisterUser = async () => {
        if (state.nombre === '' || state.apellidos === '' || state.tags === '' ||  state.numerotelefono === '' || state.email === ''|| state.contrasena === '' ){
            alert('Por favor rellena los campos')
        } else{

            try{
             if((await compruebaEmail(state.email)).length != 0){
                 alert('El correo ya esta en uso')
             }else{
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
        }
        }catch(error){
            console.error(error);
        }
        }
    }

    const compruebaEmail = async(email) =>{
        
        const q = query(collection(db, "Usuario"), where("Email", "==", email));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs;
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
    const RegisterUsersPrueba = async() => {
          setState({
            nombre:'',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege@gmail.com',
            contrasena:'S177013'
        }, () => {RegisterUser();});

        setState({
            nombre:'Samuel',
            apellidos:'',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege1@gmail.com',
            contrasena:'S177013'
        }, () => {RegisterUser();});
    }
    async function EliminarPrueba(usp){
            const q = query(collection(db, "Usuario"), where("Nombre", "==", usp));
            const querySnapshot = await getDocs(q);
            console.log("q") 
            querySnapshot.forEach((doc) => {
                console.log(doc.id)
                deleteDoc(doc);
            });
    }
    const usp = "Samuel";
    return (
        <ScrollView>
            <View>
                <Text style={screenStyles.titleText}>
                    Probar a Registrar Usuarios con diferentes formatos en sus campos:
                </Text>
            </View>
            <View style={screenStyles.button}>
                <Button color='#177013'title="Probar:" onPress={() => RegisterUsersPrueba()}/>
            </View>
            <View style={screenStyles.button}>
                <Button color='#177013'title="Eliminar Prueba:" onPress={() => EliminarPrueba(usp)}/>
            </View>
        </ScrollView>
    )
}

export default RegistrarUsuario1Screen