import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import firebase from '../database/firebase'


const LoginScreen = () => {
    const [state, setState] = useState({
        nombre:"",
        email:"",
        telefono:""
    });

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    }

    return (
        <ScrollView>
            <View>
                <Text>
                    Login
                </Text>
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Nombre" 
                onChangeText={(value => handleChangeText("nombre", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Email"
                onChangeText={(value => handleChangeText("email", value))} />
            </View>
            <View style={styles.inputComponent}>
                <TextInput placeholder="Telefono"
                onChangeText={(value => handleChangeText("telefono", value))} />
            </View>
            <View>
                <Button title="Registrarse" onPress={() => console.log(state)}/>
            </View>
        </ScrollView>
    )
}

const snapshot = firebase.db.collection('Habitacion').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});

const styles = StyleSheet.create({
    inputComponent: {
        flex:1,
        padding:0,
        margin:10,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'
    }

})

export default LoginScreen