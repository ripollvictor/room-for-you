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


    // try {
    //     GoogleSignin.hasPlayServices();
    //     const { accessToken, idToken } = GoogleSignin.signIn();
    //     const credentials = GoogleAuthProvider.credential(idToken, accessToken);
    //     const auth = getAuth();

    //     signInWithCredential(auth, credentials);
    // } catch (error) { }
};

export const DebugDB = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) alert(user.email);
};
