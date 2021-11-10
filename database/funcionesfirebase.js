import firebase from './firebase'
//import { collection, doc,setDoc } from 'firebase/firestore';
import '../clases/usuario'
//import firebase from '../database/firebase'
import { getFirestore, collection, getDocs, doc ,addDoc, query,where,deleteDoc,setDoc,getDoc} from 'firebase/firestore/lite';
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
//conseguirIdUsuario(email).then((id usuario)=>{ // continuas el codigo...});

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

export function listadeFavoritos(){
    const email = emailUsuario();
    conseguirIdUsuario(email).then((idusuario) =>{
        listafavconid(idusuario).then((listasolicitud)=>{
                 return listasolicitud;
        });
    });
}
async function listafavconid(id_usuario) {
    return new Promise(async function(resolve,reject){
    const q = query(collection(db, "Solicitud"), where("id_usuario", "==", id_usuario));
    const querySnapshot = await getDocs(q);
    let  Solicitudes  = new Array();
    querySnapshot.forEach((doc) => {
             Solicitudes.push(doc);
      });

    resolve(Solicitudes);
})
}


export async function eliminarSolicitud(idsolicitud){
    await deleteDoc(doc(db, "Solicitud", idsolicitud));
}

export async function listaVivienda(){
    return new Promise(async function(resolve,reject){
    const q = query(collection(db, "Vivienda"));
    const querySnapshot = await getDocs(q);
    let  listaViviendas = new Array();
    querySnapshot.forEach((doc) => {
           listaViviendas.push(doc);
      });
    resolve(listaViviendas);
})
}
//listaVivienda().then((listaVivienda)=>{});

//eliminar vivienda 
export async function eliminarVivienda(idvivienda){
    await deleteDoc(doc(db, "Vivienda", idvivienda));
}

export async function getViviendaconid(idvivienda){
    return new Promise(async function(resolve,reject){
        const docRef = doc(db, "Vivienda", idvivienda);      
        const docSnap = await getDoc(docRef);
        resolve(docSnap)
        //para poder ver el id .id para la demas informacion .data().banos
})
}/* llamada a getVivienda
getViviendaconid("02").then((vivienda)=>{
    console.log(vivienda.id);
    console.log(vivienda.data());
    console.log(vivienda.data().Numero);
});
*/
export async function modificarVivienda(vivienda){
    const data ={
        Banos: vivienda.Banos,
        Direccion: vivienda.Direccion,
        EscaleraPisoPuerta: vivienda.EscaleraPisoPuerta,
        FechaRegistro: vivienda.FechaRegistro,
        Imagenes: vivienda.Imagenes,
        MetrosCuadrados: vivienda.MetrosCuadrados,
        NumHabitaciones: vivienda.NumHabitaciones,
        Ubicacion: vivienda.Ubicacion,
        id_usuario: vivienda.id_usuario
    };
  const res = await setDoc(doc(db,"Vivienda",vivienda.id_vivienda),data);
}
/*
const [state, setState] = useState({
        Banos: vivienda.Banos,
        Direccion: vivienda.Direccion,
        EscaleraPisoPuerta: vivienda.EscaleraPisoPuerta,
        FechaRegistro: vivienda.FechaRegistro,
        Imagenes: vivienda.Imagenes,
        MetrosCuadrados: vivienda.MetrosCuadrados,
        NumHabitaciones: vivienda.NumHabitaciones,
        Ubicacion: vivienda.Ubicacion,
        id_usuario: vivienda.id_usuario,
        id_vivienda: vivienda.id_vivienda
});
*/
