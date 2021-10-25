import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


var firebaseApp = initializeApp({
    apiKey: "AIzaSyBcljfI648ysrCctZtPb8Y-2wsT5LnHC3I",
    authDomain: "room-for-you-87832.firebaseapp.com",
    projectId: "room-for-you-87832",
    storageBucket: "room-for-you-87832.appspot.com",
    messagingSenderId: "46279018872",
    appId: "1:46279018872:web:4ee5fec0088ea27f30e08d",
    measurementId: "G-BWHGN84GL0"
})

// Initialize Firebase
const db = getFirestore();

export default db;