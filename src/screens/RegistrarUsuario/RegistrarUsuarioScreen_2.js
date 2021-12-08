import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'
import { ButtonImgShadow, ButtonImg } from '../../components/elements/Button'
import { TextField, PasswordField } from '../../components/elements/Input'
import { colors } from '../../styles/colors'

const RegistrarUsuario2Screen = ({navigation}) => {


    /**
     * Comprobar que todos los campos cumplen todas las condiciones y si está todo correcto registrar al nuevo usuario
     */
     const CheckFields = () => {
        // Comprobaciones

        // Registrar usuario y mantener sesión iniciada

        navigation.navigate('Main')
    }

    return(
        <View style={global.default}>
            <Text style={[global.title, {marginTop: 126, marginBottom: 46}]}>¡Háblanos de ti!</Text>
            <Text style={[global.description, {marginBottom: 36}]}>Para que el resto de personas puedan comunicarse</Text>
            <TextField
                title = 'Nombre'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {}}
            />
            <TextField
                title = 'Apellidos'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {}}
            />
            <TextField
                title = 'Fecha de nacimiento'
                focusColor = {colors.secondary}
                marginBottom={128}
                keyboardType = 'numeric'
                onChangeText = {(value) => {}}
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
        </View>
    )
}

export default RegistrarUsuario2Screen