import firebase from './firebase'
//import { collection, doc,setDoc } from 'firebase/firestore';
import '../clases/usuario'
//import firebase from '../database/firebase'
import { getFirestore, collection, getDocs, doc ,addDoc, query,where,deleteDoc,setDoc,getDoc,updateDoc} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { connectStorageEmulator } from '@firebase/storage';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const db = firebase.db;





//////////////////////////////////////////////////////////////////
////////Cosas relacionadas con SolicitudFavoritos///////////////
////////////////////////////////////////////////////////////////
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
    return new Promise(async function(resolve,reject){
    const email = emailUsuario();
    conseguirIdUsuario(email).then((idusuario) =>{
        listafavconid(idusuario).then((listasolicitud)=>{
                 resolve(listasolicitud);
        });
    });
})
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



///////////////////////////////////////////////////////
////////Cosas relacionadas con Vivienda///////////////
///////////////////////////////////////////////////////

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
   eliminarHabitacion(idvivienda);
}

export async function getViviendaDelUser() {
    return new Promise(async function(resolve,reject){
    const email = emailUsuario();
    conseguirIdUsuario(email).then((idusuario) =>{
        getviviendaporIdUser(idusuario).then((vivienda)=>{
            resolve(vivienda);
        })
    })
})
      
}
async function getviviendaporIdUser(iduser) {
    return new Promise(async function(resolve,reject){

        const q = query(collection(db, "Vivienda"), where("id_usuario", "==", id_usuario));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            resolve(doc);
      });    
    })
}

export async function getViviendaconidvivieda(idvivienda){
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
///////////////////////////////////////////////////////
////////Cosas relacionadas con Habitacion///////////////
///////////////////////////////////////////////////////
export async function habitacionSetEstadoOcupada(idhabitacion){
    const habitref =  doc(db,"Habitacion",idhabitacion);
    const res = await updateDoc(habitref,{Estado: 1});

}

export async function habitacionSetEstadoLibre(idhabitacion){
    const habitref =  doc(db,"Habitacion",idhabitacion);
    const res = await updateDoc(habitref,{Estado: 0});

}

//eliminar habitaciones sin probar 
async function eliminarHabitacion(idvivienda){
    const q = query(collection(db, "Habitacion"), where("id_vivienda", "==", idvivienda));
    const querySnapshot = await getDocs(q);;
    querySnapshot.forEach((doc) => {
             deleteDoc(doc);
      });
}
// comprobar esto 
export async function anadirHabitacion(habitacion){
    const docRef = await addDoc(collection(db,'Habitacion'),habitacion);
}


///////////////////////////////////////////////////////
////////Cosas relacionadas con Companero///////////////
///////////////////////////////////////////////////////

export async function anadirCompaneroalPiso(idusuario,idvivienda){
    const docRef = await addDoc(collection(db,'Companeros'),{
        id_usuario:idusuario,
        id_vivienda:idvivienda        
    })
}

export async function eliminarCompanerobyidTabla(idCompaneros) {
    await deleteDoc(doc(db, "Companeros", idCompaneros));
}

