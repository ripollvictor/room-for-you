import firebase from '../database/firebase'
//import { collection, doc,setDoc } from 'firebase/firestore';
import '../clases/usuario'
//import firebase from '../database/firebase'
import { getFirestore, collection, getDocs,doc ,addDoc} from 'firebase/firestore/lite';


/*
db.collection("Habitacion").get().then((QuerySnapshot)=>{
   QuerySnapshot.forEach((doc)=> {
       console.log(doc.id)
   });

})
*/
const db = firebase.db;
/*
const snapshot = await firebase.db.collection('users').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});
*/

export async function anadirusuario(auxusuario){
    //const auxusuario = new Usuario();
   // auxusuario = auxusuarioa
   console.log(auxusuario.apellidos);
  // (async () => {
    const docRef = await addDoc(collection(db,'Usuario'),{
      //name:"Tokyo",
      
      Nombre: auxusuario.getNombre(),
      Apellidos:  auxusuario.getApellidos(),
      Contrasena : auxusuario.getContrasena(),
      Email: auxusuario.email,
      FechaNacimiento :  auxusuario.fechanacimiento,
      NumeroTelefonico:  auxusuario.numerotelefono,
      Tags: auxusuario.tags

    });
    console.log("Document written with ID: ", docRef.id);
//});
console.log(auxusuario.apellidos);
  



}