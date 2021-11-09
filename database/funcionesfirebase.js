import firebase from './firebase'
//import { collection, doc,setDoc } from 'firebase/firestore';
import '../clases/usuario'
//import firebase from '../database/firebase'
import { getFirestore, collection, getDocs,doc ,addDoc, query,where} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { connectStorageEmulator } from '@firebase/storage';

const db = firebase.db;

export function anadirSolicitud(idVivienda){
    const email = emailUsuario();
    conseguirIdUsuario(email).then((idusuario) =>{
        solicitudaBase(idusuario,idVivienda);
        });
}
//añadir a la base  
async function solicitudaBase(iduse,idVivienda){
     const docRef = await addDoc(collection(db,'Solicitud'),{
         Estado:0,
         Fecha: new Date(),
         id_usuario: iduse,
         id_vivienda: idVivienda        
     })
}
//conseguir el id
async function conseguirIdUsuario(email) {
    return new Promise(async function(resolve,reject){
        const q = query(collection(db, "Usuario"), where("Email", "==", email));
        const querySnapshot = await getDocs(q); 
        querySnapshot.forEach((doc) => {
                 resolve(doc.id);       
          });
    })
    
}

//para conseguir el email actual del usuario
function emailUsuario(){
    const auth = getAuth();
    const user = auth.currentUser;
    const email1 = null;
    if(user!=null){
         return user.email;
    }else{
        console.log("Upsi2.0");
    }
    return email1;
}