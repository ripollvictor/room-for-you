//import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcljfI648ysrCctZtPb8Y-2wsT5LnHC3I",
    authDomain: "room-for-you-87832.firebaseapp.com",
    projectId: "room-for-you-87832",
    storageBucket: "room-for-you-87832.appspot.com",
    messagingSenderId: "46279018872",
    appId: "1:46279018872:web:4ee5fec0088ea27f30e08d",
    measurementId: "G-BWHGN84GL0"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const storage = getStorage();
export function subirArchivo(file){
  const metadata = {
    contentType: file.type
  };
  const imageRef = ref(storage, 'images/' + Math.round(Math.random()*1000));
  uploadBytesResumable(imageRef, file, metadata).then((snapshot) => {
    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    console.log('File metadata:', snapshot.metadata);
    // Let's get a download URL for the file.
    getDownloadURL(snapshot.ref).then((url) => {
      console.log('File available at', url);
      // ...
    });
  }).catch((error) => {
    console.error('Upload failed', error);
    // ...
  });
}

//const db = firebase.firestore();
/*
const uploadImage = async ({uri}) => {
  let storageRef= firebase.storage().ref().child('ImagenesViviendas/${uri}');

  await storageRef.put(uri);
  return storageRef;
}
import firebase from '../database/firebase'
import { getFirestore, collection, getDocs,doc } from 'firebase/firestore/lite';
esto es lo que lleven llevar las otras clases
*/
export default {
    db
}