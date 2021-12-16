import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { global } from '../../styles/global'
import { variables } from '../../styles/variables'
import { ButtonImgShadow, ButtonImg } from '../../components/elements/Button'
import { TextField, PasswordField } from '../../components/elements/Input'
import { colors } from '../../styles/colors'
import { UsuarioDB } from '../../database/UsuarioDB'
import { RegistrarUsuarioDB } from '../../database/helper'
import { subirArchivo } from "../../database/helper";


const RegistrarUsuario2Screen = ({route, navigation}) => {

    const {email, fotoPerfil, telefono, password} = route.params
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')

    /**
     * Comprobar que todos los campos cumplen todas las condiciones y si está todo correcto registrar al nuevo usuario
     */
     const CheckFields = async () => {
        // Comprobaciones

        const errores = []

        if (nombre === '') errores.push('El nombre está vacio')
        if (apellidos === '') errores.push('Los apellidos están vacios')
        if (fechaNacimiento === '') errores.push('La fecha de nacimiento está vacio')
        if (checkFechaNacimiento()) errores.push('La fecha no sigue el estandar DD-MM-AAAA')

        if (errores.length === 0) {
            let urlImgFirebase = '';

            // para saber si es un usuario sin registrar de google es que no tiene ni contraseña ni telefono
            if(telefono === '') {
                urlImgFirebase = fotoPerfil;
            } else {
                urlImgFirebase = await subirArchivo(fotoPerfil)
            }

            // registrar

            const diaMesAnyo = fechaNacimiento.split('-')
            const dia = diaMesAnyo[0]
            const mes = diaMesAnyo[1] - 1
            const anyo = diaMesAnyo[2]

            const fechaNacDateObj = new Date(anyo, mes, dia)
            const newUser = new UsuarioDB(nombre, apellidos, email, fechaNacDateObj, urlImgFirebase, telefono)

            await RegistrarUsuarioDB(newUser, password)
            
            navigation.navigate('Main')

        } else {
            // mostrar errores
            console.log('error')

        }

        
    }

    /**
     * Si ha encontrado algun error devolverá true
     * @returns 
     */
    const checkFechaNacimiento = () => {
        const diaMesAnyo = fechaNacimiento.split('-')

        if (diaMesAnyo.length !== 3) return true

        const dia = diaMesAnyo[0]
        const mes = diaMesAnyo[1]
        const anyo = diaMesAnyo[2]

        if (!(dia.length === 2 || dia.length === 1)) return true
        if (!(mes.length === 2 || mes.length === 1)) return true
        if (parseInt(mes) > 12) return true
        if (anyo.length !== 4) return true

        return false
    }

    return(
        <ScrollView style={global.default}>
            <Text style={[global.title, {marginTop: 126, marginBottom: 46}]}>¡Háblanos de ti!</Text>
            <Text style={[global.description, {marginBottom: 36}]}>Para que el resto de personas puedan comunicarse</Text>
            <TextField
                title = 'Nombre'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {setNombre(value)}}
            />
            <TextField
                title = 'Apellidos'
                focusColor = {colors.secondary}
                marginBottom={variables.spaceBetweenElems}
                returnKeyType = 'next'
                onChangeText = {(value) => {setApellidos(value)}}
            />
            <TextField
                title = 'Fecha de nacimiento'
                focusColor = {colors.secondary}
                marginBottom={128}
                onChangeText = {(value) => {setFechaNacimiento(value)}}
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

export default RegistrarUsuario2Screen