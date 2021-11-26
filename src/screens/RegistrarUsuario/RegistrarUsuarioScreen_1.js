import { screenStyles } from './styles'
import React, {useEffect, useState} from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { getFirestore, collection, getDocs, doc ,addDoc, query,where,deleteDoc,setDoc,getDoc,updateDoc} from 'firebase/firestore/lite';
import firebase from '../../../old/database/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword,updateProfile, update} from "firebase/auth";
import { async } from '@firebase/util';

const db = firebase.db;

const RegistrarUsuario1Screen = () => {
    var [state, setState] = useState({
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
    async function RegisterUsersPrueba(){
        return new Promise(async function(resolve,reject){
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege5@gmail.com',
            contrasena:'S177013'
        });
        console.log(state.nombre)
        resolve();
    })
    }
    async function EliminarPrueba(usp){
        return new Promise(async function(resolve,reject){
            const q = query(collection(db, "Usuario"), where("Nombre", "==", usp));
            const querySnapshot = await getDocs(q);
                resolve(querySnapshot)
            })
    }
    var arr2 = []
    async function EliminarPrueba2(usp){
        EliminarPrueba(usp).then((qu)=>{
            return new Promise(async function(resolve,reject){
            var arr = []
            qu.forEach((doc) =>{
                arr.push(doc.id)
        })
        arr2 = arr
        resolve(arr)
        })
     })
    }
    async function EliminarPrueba3(usp){
        EliminarPrueba2(usp).then((c)=>{
            arr2.forEach((item) =>{
                const a = doc(db, 'Usuario', item);
                deleteDoc(a);
            })

        })
    }

    return (
        <ScrollView>
            <View>
                <Text style={screenStyles.titleText}>
                    Probar a Registrar Usuarios con diferentes formatos en sus campos:
                </Text>
            </View>
            <View style={screenStyles.button}>
                <Button color='#177013'title="Probar:" onPress={() => RegisterUsersPrueba().then(() => {RegisterUser()})}/>
            </View>
            <View style={screenStyles.button}>
                <Button color='#177013'title="Eliminar Prueba:" onPress={() => EliminarPrueba3("Samuel")}/>
            </View>
        </ScrollView>
    )
}

/*
		setState({
            nombre:'',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege@gmail.com',
            contrasena:'S177013'
        }, () => {RegisterUser()});

        setState({
            nombre:'Samuel',
            apellidos:'',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege1@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser();
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege2@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser();
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'',
            email:'samuelvege3@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser();
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'',
            contrasena:'S177013'
        });
        RegisterUser();
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege4@gmail.com',
            contrasena:''
        });
        RegisterUser();
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege5@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser();
        setState({
            nombre:'123Sam123uel123',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege6@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser(); 
        setState({
            nombre:'Xx_Samuel_xX',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege7@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser(); 
        setState({
            nombre:'Samuel',
            apellidos:'123Di123az123',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege8@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser(); 
        setState({
            nombre:'Samuel',
            apellidos:'Xx_Diaz_xX',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege9@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser(); 
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'Esto626No',
            email:'samuelvege10@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser(); 
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'123456789098765432177013',
            email:'samuelvege11@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser(); 
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'177013',
            email:'samuelvege12@gmail.com',
            contrasena:'S177013'
        });
        RegisterUser();
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege13@gmail.com',
            contrasena:'177013'
        });
        RegisterUser();
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege14@gmail.com',
            contrasena:'samuel'
        });
        RegisterUser();
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege15@gmail.com',
            contrasena:'s177013'
        });
        RegisterUser();
        setState({
            nombre:'Samuel',
            apellidos:'Diaz',
            tags:'Deportista',
            fechaNacimiento:'',
            time: new Date("2020","02","22"),
            numerotelefono:'626802895',
            email:'samuelvege16@gmail.com',
            contrasena:'S123'
        });
        RegisterUser();
*/

export default RegistrarUsuario1Screen