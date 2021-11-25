//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import { initializeApp } from 'firebase/app';
const holi= require("firebase/auth")
const base = require('firebase/app')
const firebaseConfig = {
    apiKey: "AIzaSyBcljfI648ysrCctZtPb8Y-2wsT5LnHC3I",
    authDomain: "room-for-you-87832.firebaseapp.com",
    projectId: "room-for-you-87832",
    storageBucket: "room-for-you-87832.appspot.com",
    messagingSenderId: "46279018872",
    appId: "1:46279018872:web:4ee5fec0088ea27f30e08d",
    measurementId: "G-BWHGN84GL0"
}


// Initialize Firebase
const app = base.initializeApp(firebaseConfig);


function generatePasswordRand(length,type) {
    switch(type){
        case 'num':
            characters = "0123456789";
            break;
        case 'alf':
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 'rand':
            //FOR ↓
            break;
        default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
    }
    var pass = "";
    for (i=0; i < length; i++){
        if(type == 'rand'){
            pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
        }else{
            pass += characters.charAt(Math.floor(Math.random()*characters.length));   
        }
    }
    return pass;
}
const checkLogIn = (correo) => {
    const auth = holi.getAuth()
    var i = 1;
    var password = generatePasswordRand(20,"rand")
    holi.signInWithEmailAndPassword(auth, correo, password)
        .then((userCredential) => {
            console.log(i +"\t\t" + correo +"\t\t" + password +"\t\t"+ "Exito")
            i++;
        })
        .catch((error) => {
            console.log(i +"\t\t" + correo +"\t\t" + password +"\t\t"+ "Fallo")
            i++;
        })
}

console.log("Numero Intento \t Correo Utilizado\t\t\tContraseña\t\t\tResultado")

 Inicioscript("diego.ruiz.2000@hotmail.com",2)
function Inicioscript(correo,intentos){
 var i = 1;

  
    for(x = 0;i<intentos+1;i++){

           checkLogIn(correo)
    }


}