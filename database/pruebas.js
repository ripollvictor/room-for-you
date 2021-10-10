import firebase from '../database/firebase'
import { collection, doc,setDoc } from 'firebase/firestore';



/*
db.collection("Habitacion").get().then((QuerySnapshot)=>{
   QuerySnapshot.forEach((doc)=> {
       console.log(doc.id)
   });

})
*/
const snapshot = await firebase.db.collection('users').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});