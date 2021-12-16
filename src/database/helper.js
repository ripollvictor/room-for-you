import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

import {
    getAuth,
    signOut,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword 
} from "firebase/auth";

import {
    collection,
    doc,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    refEqual,
} from 'firebase/firestore'

import firebase from './conection'
import * as Google from 'expo-google-app-auth'
import { OfertaDB } from "./OfertaDB";
import { UsuarioDB } from "./UsuarioDB"

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

export const InicarSesion = async (email, password) => {
    const auth = getAuth()
    return signInWithEmailAndPassword(auth, email, password)
}

export const CerrarSesion = async () => {
    const auth = getAuth();
    return signOut(auth)
};


/**
 * 
 * @returns {integer} 0 - si el usuario ha cancelado la operación de iniciar sesión con google, 1 - si no está registrado en la base de datos, 2 - si está registrado
 */
export const IniciarConGoogle = async () => {

    const { type, accessToken, idToken } = await Google.logInAsync({
        iosClientId: '46279018872-fvp0jq7jlhbtol9q72euf162lh3o6gr2.apps.googleusercontent.com',
        androidClientId: '46279018872-ol5kn61s6c65hrbnerhhc98n5pfqsb21.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
    })

    if (type === 'success') {

        // Comprobar si el email ya está en la base de datos y si no lo está registrarlo en la base de datos

        const auth = getAuth()
        const credentials = GoogleAuthProvider.credential(idToken, accessToken);

        await signInWithCredential(auth, credentials)

        const res = await GetUserIdFromEmail(auth.currentUser.email)
        if (res === false) return 1

        return 2
    } else {
        return 0
    }
}

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

/**
 * Obtener el ID de un usario dado su email
 * @param {string} email 
 * @returns {bool|integer} Puede devolver falso cuando el usuario no está registrado en la base de datos y si lo está devolverá la ID del usuario
 */
export const GetUserIdFromEmail = async email => {
    const promise = GetDocsFrom('Usuario', 'Email', email)
    const res = await promise

    if (res.docs.length === 0) return false

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

const GetFavoritos = async () => {
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
        ofertas.push(new OfertaDB(
            doc.id,
            auxOfertaData['Ofertador'],
            auxOfertaData['Direccion'],
            auxOfertaData['Precio'],
            auxOfertaData['Imagenes']
        ))
    })

    return ofertas
}

/**
 * Devuelve las ofertas que el usuario logeado le ha gustado en forma de objeto con su id, dirección, imagenes (array de string) y precio
 * @returns Un array de objetos OfertaDB
 */
export const GetOfertasFavoritas = async () => {

    const solicitudesDoc = await GetFavoritos()
    const ofertasRef = []
    const ofertas = []

    solicitudesDoc.forEach(doc => {
        ofertasRef.push(doc.data()['id_vivienda'])
    })

    if (ofertasRef.length !== 0) {

        for (const ref of ofertasRef) {
            const doc = await getDoc(ref)
            const docAuxData = await doc.data()

            ofertas.push(new OfertaDB(
                doc.id,
                docAuxData['Ofertador'],
                docAuxData['Direccion'],
                docAuxData['Precio'],
                docAuxData['Imagenes']
            ))
        }
    }

    return ofertas
}

export const GetOfertaById = async (ofertaId) => {

}

export const GetUserDataFromEmail = async email => {
    const promise = GetDocsFrom('Usuario', 'Email', email)
    const res = await promise

    // res es un objeto que contiene un array con los usuarios con el mismo email (docs). Como solo debe haber uno el resultado tiene que estar en
    // el indice 0 y luego obtener la id con su propiedad id.
    // console.log(res.docs[0].id)

    return res.docs[0]
}

export const ModificarDatosUsuaio = async user => {
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
    const promise = setDoc(doc(db, "Usuario", user.id_user), data);
    const res = await promise;
}

/**
 * Registrar un usuario en la base de datos
 * @param {UsuarioDB} userDB 
 */
export const RegistrarUsuarioDB = async (userDB, password) => {
    addDoc(collection(db, 'Usuario'), {
        'Nombre': userDB.nombre,
        'Apellidos': userDB.apellidos,
        'Email': userDB.email,
        'Telefono': userDB.telefono,
        'FotoPerfil': userDB.fotoPerfil,
        'FechaNacimiento': userDB.fechaNacimiento
    })

    if (password !== undefined) {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, userDB.email, password)
    }
}

export const GetEmailOfertador = async ofertadorRef => {
    const ofertador = await getDoc(ofertadorRef)
    const email = ofertador.data()['Email']
    return email
}


export const GetChatsUser = async () => {
    let usuariosRef = [];
    //Coger las solicitudoes donde eres el Solicitante

    const email = GetEmailFromCurrentUser()

    const userRef = await GetUserRefByEmail(email);


    let Solicitante = await getDocs(query(collection(db, "Chats"), where("Solicitante", "==", userRef)));
    Solicitante.forEach((doc) => {
        usuariosRef.push(doc.data()['Ofertador'])
    });
    let Ofertador = await getDocs(query(collection(db, "Chats"), where("Ofertador", "==", userRef)));
    Ofertador.forEach((doc) => {
        usuariosRef.push(doc.data()['Solicitante'])
    });

    let usuarios = []

    for (let ref of usuariosRef) {
        let datos = await getDoc(ref)
        usuarios.push(datos.data());
    }

    return removeDuplicates(usuarios, "Email");
}

function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

const GetUserRefByEmail = async email => {
    const userID = await GetUserIdFromEmail(email);
    const userRef = doc(db, "Usuario", userID)
    return userRef
}

export const CreateSolicitud = async (ofertaId, ofertadorRef) => {

    const email = GetEmailFromCurrentUser()
    const userRef = await GetUserRefByEmail(email)

    const ofertaRef = doc(db, 'Oferta', ofertaId)

    addDoc(collection(db, 'Solicitud'), {
        'Estado': 0,
        'id_usuario': userRef,
        'id_vivienda': ofertaRef
    })

    addDoc(collection(db, 'Chats'), {
        'Ofertador': ofertadorRef,
        'Solicitante': userRef
    })
}

