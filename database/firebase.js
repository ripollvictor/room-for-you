//import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";



//import 'firebase/firestore';

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
const storage = getStorage(app);

const uploadImage = async ({uri}) => {
  let storageRef= firebase.storage().ref().child('ImagenesViviendas/${uri}');

  await storageRef.put(uri);
  return storageRef;
}
//const db = firebase.firestore();
/*
import firebase from '../database/firebase'
import { getFirestore, collection, getDocs,doc } from 'firebase/firestore/lite';
esto es lo que lleven llevar las otras clases
*/
export default {
 //   firebase,
    db,
    uploadImage,
    storage
}