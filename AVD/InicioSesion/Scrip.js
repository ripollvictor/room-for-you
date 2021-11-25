const aut= require("firebase/auth")
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

// Inicializar Firebase
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

var x = 1;
const checkLogIn = (correo) => {
    const auth = aut.getAuth()

    var password = generatePasswordRand(20,"rand")
    aut.signInWithEmailAndPassword(auth, correo, password)
        .then((userCredential) => {          
            console.log(x +"\t\t" + correo +"\t\t" + password +"\t\t"+ "Exito")
            x = x + 1;
        })
        .catch((error) => {          
            console.log(x +"\t\t" + correo +"\t\t" + password +"\t\t"+ "Fallo")
            x = x + 1;
        })
}

console.log("Numero Intento \t Correo Utilizado\t\t\tContraseña\t\t\tResultado")

 Inicioscript("diego.ruiz.2000@hotmail.com",3)
function Inicioscript(correo,intentos){
 var i = 1;
    for(x = 0;i<intentos+1;i++){

           checkLogIn(correo)
    }
}