import firebase from '../database/firebase'
//import { collection, doc,setDoc } from 'firebase/firestore';
import '../clases/usuario'
//import firebase from '../database/firebase'
import { getFirestore, collection, getDocs,doc ,addDoc, query,where} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const db = firebase.db;

export async function anadirSolicitud(idVivienda){
 //(async ()=>{
     const email = emailUsuario();
     const idUse = idUsuario(email);
     const docRef = await addDoc(collection(db,'Solicitud'),{
         Estado:0,
         Fecha:Date.now(),
         id_usuario: idUse,
         id_vivienda: idVivienda
         
     })

 //})

}
//para conseguir el email actual del usuario
function emailUsuario(){
    const auth = getAuth();
    const user = auth.currentUser;
    const email = null;
    if(user!=null){
         email = user.email;
    }else{
        console.log("Upsi2.0");
    }
    return email;
}

//conseguir el id de la base de datos  del usuario actual
function idUsuario(email){
    (async ()=>{
    const q = query(collection(db, "Usuario"), where("Email", "==", email));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
     return doc.id;
});
})
}