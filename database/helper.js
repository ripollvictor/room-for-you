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
    signInWithPopup,
    signInWithRedirect,
    signInWithEmailAndPassword,
} from 'firebase/auth'

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
    const auth = getAuth()
    signOut(auth).then(() => {
        // Hace algo cuando se cierre sesión
    }).catch((error) => {
        // Cuando ha ocurrido algun error
    })
}

export const IniciarConGoogle = () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

    const auth = getAuth()

    console.log(signInWithEmailAndPassword)

    //signInWithPopup(auth, provider)
}

export const DebugDB = () => {
    const auth = getAuth()
    const user = auth.currentUser

    alert(user.email)
}
