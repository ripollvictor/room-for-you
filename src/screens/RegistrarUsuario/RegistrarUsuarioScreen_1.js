import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'
import { ButtonImgShadow, ButtonImg } from '../../components/elements/Button'
import { TextField, PasswordField } from '../../components/elements/Input'
import { colors } from '../../styles/colors'

const RegistrarUsuario1Screen = ({navigation}) => {
    const   [email, setEmail] = useState(''),
            [telefono, setTelefono] = useState(''),
            [password, setPassword] = useState(''),
            [confirm, setConfirm] = useState(''),
            [perfilSource, setPerfilSource] = useState('')

    /**
     * Comprobar que todos los campos cumplen todas las condiciones y si está todo correcto pasar a la siguiente fase de registrar
     */
    const CheckFields = () => {
        // Comprobaciones

        navigation.navigate('Registrar 2')
    }

    return(
        <ScrollView style={global.default}>
            <View 
                style={{
                    alignItems: 'center',
                    marginTop: 45,
                    marginBottom: 39,
                }}
            >
                <ButtonImgShadow
                    imgSource={require('../../../assets/registrar/suma.png')} 
                    widthContianer={93}
                    heightContianer={93}
                    widthImg={25}
                    heightImg={25}
                    backgroundColor={colors.gray}
                    func={() => {console.log('hoola')}}
                />
            </View>
            <Text style={[global.title, {marginBottom: 54}]}>
                Tus datos personales
            </Text>
            <TextField
                title = 'Correo electrónico'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {setEmail(value)}}
            />
            <TextField
                title = 'Teléfono'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {setTelefono(value)}}
            />
            <PasswordField 
                title = 'Contraseña'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {setPassword(value)}}
            />
            <PasswordField 
                title = 'Confirmar contraseña'
                focusColor = {colors.secondary}
                marginBottom={66}
                onChangeText = {(value) => {setConfirm(value)}}
            />

            <View style={{alignItems: 'flex-end'}}>
                <ButtonImg 
                    imgSource={require('../../../assets/registrar/next.png')}
                    widthContianer={55}
                    heightContianer={50}
                    widthImg={27}
                    heightImg={22}
                    backgroundColor={colors.white}
                    func={() => CheckFields()}
                />
            </View>
        </ScrollView>
    )
}

export default RegistrarUsuario1Screen