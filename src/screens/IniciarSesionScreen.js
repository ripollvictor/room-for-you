import React, { useState } from 'react'
import { View, ScrollView , Image } from 'react-native'
import { TextField, PasswordField } from '../components/elements/Input'
import { DefaultButton } from '../components/elements/Button'
import { colors } from '../styles/colors'
import { global } from '../styles/global'
import { variables } from '../styles/variables'
import { InicarSesion } from '../database/helper'

const IniciarSesionScreen = ({navigation}) => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const CheckCredentials = async () => {
        try {
            await InicarSesion(user, password)
            navigation.navigate('Main')
        } catch {
            console.log('error')
        }
        
    }


    return(
        <ScrollView  style={global.default}>
            <Image
                source = {require('../../assets/InciarSesion/carita.png')}
                style = {{
                    width: 133,
                    height: 133,
                    alignSelf: 'center',
                    marginBottom: 45,
                    marginTop: 158
                }}
            />
            <TextField
                title = 'Correo electrónico o teléfono'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {setUser(value)}}
            />
            <PasswordField 
                title = 'Contraseña'
                focusColor = {colors.secondary}
                marginBottom = {194}
                onChangeText = {(value) => {setPassword(value)}}
            />

            <DefaultButton
                title = 'Iniciar sesión'
                bold = 'true'
                center='true'
                backgroundColor={colors.black}
                textColor = {colors.white}
                func = {() => CheckCredentials()}
            />
        </ScrollView >
    )
}

export default IniciarSesionScreen