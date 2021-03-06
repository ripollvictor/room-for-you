import { screenStyles } from './styles'

import React, { useState } from "react"
import { View, Image, Text } from "react-native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
 
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"

const IniciarSesionScreen = ({navigation}) => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleChangeText = (key, value) => {
        setCredentials({...credentials, [key]: value})
    }


    // https://firebase.google.com/docs/auth/web/password-auth?hl=es#sign_in_a_user_with_an_email_address_and_password
    const checkLogIn = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                alert('Logeado')
             navigation.navigate('PerfilUsuario') 
            })
            .catch((error) => {
                alert('Upsi')
            })
    }

    return(
        <View style={screenStyles.container}>
            <Image style={screenStyles.logo} source={require('../../assets/logo.png')} />
            <Text style={screenStyles.mainText}>Introduce tus datos</Text>

            {/* AQUI VAN LOS INPUTS */}
            <Input onChangeText={(value) => { handleChangeText('email', value) }} placeholder='Correo electrónico' style={screenStyles.inputSpace} />
            <Input onChangeText={(value) => { handleChangeText('password', value) }} inputType='password' placeholder='Contraseña' />

            <View style={screenStyles.btnWrap}>
                <Button btnType='blue' onPress={() => { checkLogIn() }}>Iniciar sesión</Button>
            </View>

        </View>
    )

}

export default IniciarSesionScreen