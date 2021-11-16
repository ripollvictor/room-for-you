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
    getDoc
} from 'firebase/firestore/lite'

import firebase from './firebase'
const db = firebase.db

import * as Google from 'expo-google-app-auth';

export function subirArchivo(file) {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + Math.round(Math.random() * 10000));
    uploadString(imageRef, file, "data_url")
        .then((snapshot) => {
            console.log("Uploaded", snapshot.totalBytes, "bytes.");
            console.log("File metadata:", snapshot.metadata);
            // Let's get a download URL for the file.
            getDownloadURL(snapshot.ref).then((url) => {
                console.log("File available at", url);
                // ...
            });
        })
        .catch((error) => {
            console.error("Upload failed", error);
            // ...
        });
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