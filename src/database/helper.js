import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";

import {
    getAuth,
    signOut,
    GoogleAuthProvider,
    signInWithCredential,
} from "firebase/auth";

import {
    collection,
    doc,
    query,
    where,
    getDocs,
    getDoc,
    setDoc
} from 'firebase/firestore/lite'

import firebase from './conection'
import * as Google from 'expo-google-app-auth'

const db = firebase.db

export async function subirArchivo(uri) {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const storage = getStorage();
    const nombreImagen = Math.round(Math.random() * 100000000000);
    const imageRef = ref(storage, "images/" + nombreImagen);
    const result = await uploadBytes(imageRef, blob);
    // We're done with the blob, close and release it
    blob.close();
  
    return await getDownloadURL(imageRef);
}

export const CerrarSesion = () => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            // Hace algo cuando se cierre sesión
        })
        .catch((error) => {
            // Cuando ha ocurrido algun error
        });
};

export const IniciarConGoogle = async () => {

    const { type, accessToken, idToken } = await Google.logInAsync({
        iosClientId: '46279018872-fvp0jq7jlhbtol9q72euf162lh3o6gr2.apps.googleusercontent.com',
        androidClientId: '46279018872-ol5kn61s6c65hrbnerhhc98n5pfqsb21.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
    })

    if (type === 'success') {
        
        const auth = getAuth()
        const credentials = GoogleAuthProvider.credential(idToken, accessToken);

        signInWithCredential(auth, credentials)

    }
};

const GetDocsFrom = (collectionName, fieldName, value) => {
    return getDocs(
        query(
            collection(db, collectionName),
            where(fieldName, '==', value)
        )
    )
}

export const GetEmailFromCurrentUser = () => {
    const auth = getAuth()
    const user = auth.currentUser
    if (user.email) return user.email
}

export const GetUserIdFromEmail = async email => {
    const promise = GetDocsFrom('Usuario', 'Email', email)
    const res = await promise

    // res es un objeto que contiene un array con los usuarios con el mismo email (docs). Como solo debe haber uno el resultado tiene que estar en
    // el indice 0 y luego obtener la id con su propiedad id.
    // console.log(res.docs[0].id)

    return res.docs[0].id
}

export const GetViviendaIdFromUserId = async userId => {
    const docRef = doc(db, 'Usuario', userId)

    const promise = GetDocsFrom('Vivienda', 'id_usuario', docRef)
    const res = await promise

    // console.log(res.docs[0].id)
    return res.docs[0].id
}

export const GetSolicitudes = async () => {
    const email = GetEmailFromCurrentUser()

    const p_UserId = GetUserIdFromEmail(email)
    const r_UserId = await p_UserId

    const p_ViviendaId = GetViviendaIdFromUserId(r_UserId)
    const r_ViviendaId = await p_ViviendaId

    const viviendaRef = doc(db, 'Vivienda', r_ViviendaId)

    const p_Solicitudes = GetDocsFrom('Solicitud', 'id_vivienda', viviendaRef)
    const r_Solicitudes = await p_Solicitudes

    //console.log(r_Solicitudes.docs)
    return r_Solicitudes.docs
}

export const GetFavoritos = async () => {
    const email = GetEmailFromCurrentUser()

    const p_UserId = GetUserIdFromEmail(email)
    const r_UserId = await p_UserId

    const userRef = doc(db, 'Usuario', r_UserId)

    const p_Favoritos = GetDocsFrom('Solicitud', 'id_usuario', userRef)
    const r_Favoritos = await p_Favoritos

    //console.log(r_Favoritos.docs)
    return r_Favoritos.docs
}

export const GetOfertas = async () => {
    const promise = getDocs(collection(db, 'Oferta'))
    const res = await promise

    const ofertas = new Array()
    let auxOfertaData

    res.forEach(doc => {
        auxOfertaData = doc.data()
        ofertas.push(new Oferta(
            doc.id,
            auxOfertaData['Ofertador'],
            auxOfertaData['Direccion'],
            auxOfertaData['Precio'],
            auxOfertaData['Imagenes']
        ))
    })

    return ofertas
}

export const GetUserDataFromEmail = async email => {
    const promise = GetDocsFrom('Usuario', 'Email', email)
    const res = await promise

    // res es un objeto que contiene un array con los usuarios con el mismo email (docs). Como solo debe haber uno el resultado tiene que estar en
    // el indice 0 y luego obtener la id con su propiedad id.
    // console.log(res.docs[0].id)
       
    return res.docs[0]
}

export const ModificarDatosUsuaio = async user =>{
    const data = {
        Apellidos: user.apellidos,
        Contrasena: user.contrasena,
        Email: user.email,
        FechaNacimiento: user.time,
        Nombre: user.nombre,
        NumeroTelefono: user.numerotelefono,
        tags: user.tags
    };
    console.log(data);
    const promise =  setDoc(doc(db,"Usuario",user.id_user),data);
    const res = await promise;
}

export async function GetOfertasWithinRadio (latCrentro, longCentro, radio) {
    const promise = GetOfertas()
    const res = await promise

    const ofertas = new Array()
    const latCentroEnRadianes = latCrentro * Math.PI / 180
    const radioTierra = 6371000

    res.forEach( oferta => {
        var latOferta = oferta.latitud
        var longOferta = oferta.longitud
        var latOfertaEnRadianes = latOferta * Math.PI / 180
        var variacionLatEnRadianes = (latCrentro - latOferta) * Math.PI / 180
        var variacionLongEnRadianes = (longCentro - longOferta) * Math.PI / 180
        
        var calculo1 = Math.sin(variacionLatEnRadianes / 2) * Math.sin(variacionLatEnRadianes / 2) + Math.cos(latCentroEnRadianes) * Math.cos(latOfertaEnRadianes) * Math.sin(variacionLongEnRadianes / 2) * Math.sin(variacionLongEnRadianes / 2)
        var calculo2 = 2 * Math.atan2(Math.sqrt(calculo1), Math.sqrt(1 - calculo1))
        var distancia = radioTierra * calculo2

        if(distancia <= radio) {
            ofertas.push(oferta)
        }
    })

    return ofertas
}