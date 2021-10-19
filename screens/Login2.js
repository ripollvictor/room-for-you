//import { GoogleAuthProvider } from "firebase/auth";


import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";

import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
const provider = new GoogleAuthProvider();



const Login2 = () => {
    const [user, setState] = useState({
    
    });
const Logueate = () => {

    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
           user = result.user;
           this.setState({user});
           
            // ...
         }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
         });
};

const logout=() => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
};

  return ( 
    <ScrollView>
        <View style={styles.button}>
                { user 
                  ?<Text>Hola,{user.displayName}</Text>
                  :<Text> Porfavor logueate</Text>
                }
        </View>
        <View style={styles.button}>
                <Button color= '#7733CC' onPress={Logueate} title="Seleccionar Fecha" />
        </View>
        <View style={styles.button}>
                <Button color= '#7733CC' onPress={logout} title="Cerrar Sesion" />
        </View>
    </ScrollView>
)


}

const styles = StyleSheet.create({
    textInput:{
        flex:1,
        padding:10,
        fontSize:16,
    },
    titleText:{
        flex:1,
        padding:5,
        paddingTop: 10,
        paddingLeft:10,
        fontSize:18,
        fontWeight: "bold",
        borderTopWidth:2,
    },
    text:{
        flex:1,
        padding:5,
        paddingTop: 10,
        paddingLeft:10,
        fontSize:16
    },
    inputComponent: {
        flex:1,
        marginLeft:20,
        marginBottom:10,
        marginRight:30,
        marginTop:10,
        borderWidth:2,
        borderColor:'#cccccc'
    },
    button:{
        flex:1,
        marginRight:30,
        marginLeft:20,
        marginTop:10,
        marginBottom:10
    }
})
export default  Login2