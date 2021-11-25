import { getAuth, signInWithEmailAndPassword } from "firebase/auth";




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


console.log("Numero Intento\tCorreo Utilizado\tResultado")


function Inicioscript(correo,intentos){
 var i = 1;

  
    for(x = 0;i<intentos;i++){

           checkLogIn()
    }

    const checkLogIn = () => {
        const auth = getAuth()
        var password = generatePasswordRand(20,"rand")
        signInWithEmailAndPassword(auth, correo, credentials.password)
            .then((userCredential) => {
                console.log(email +"\t" + "Exito")
                i++;
            })
            .catch((error) => {
                console.log(email +"\t" + "Fallo")
                i++;
            })
    }
}