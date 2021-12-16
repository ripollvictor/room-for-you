import React, { useEffect, useState } from 'react'
import { Pressable, View, Text } from 'react-native'
import { CerrarSesion, GetEmailFromCurrentUser, GetUserDataFromEmail } from '../database/helper'
import { variables } from '../styles/variables'
import {ViewImgShadow, DefaultButton } from '../components/elements/Button'
import { colors } from '../styles/colors'

const VerPerfilScreen = ({navigation}) => {

    const [imgURL, setImgURL] = useState(require('../../assets/icons/ofertas.png'))

    useEffect(() => {
        updateImg()
        
    }, [])

    const updateImg = async () => {
        const email = GetEmailFromCurrentUser()
        const userData = await GetUserDataFromEmail(email)
        const url = userData.data()['FotoPerfil']
        setImgURL({'uri': url})
    }

    return(
        <View style={{flex: 1, paddingTop: 70, alignItems: 'center'}}>
            <ViewImgShadow
                imgSource={imgURL} 
                widthContianer={140}
                heightContianer={140}
                widthImg={140}
                heightImg={140}
                borderRadiusImg={variables.borderRadius}
                backgroundColor={colors.secondary}
            />
            <View style={{marginTop: 50}}>
                <DefaultButton
                    title = 'Lista de contactos'
                    center='true'
                    backgroundColor={colors.white}
                    textColor = {colors.black}
                    func = {() => { navigation.navigate('ListaContactos') }}
                    marginBottom={variables.spaceBetweenElems}
                />
                <DefaultButton
                    title = 'Cerrar sesión'
                    center='true'
                    bold={true}
                    backgroundColor={colors.black}
                    textColor={colors.white}
                    func={()=> {CerrarSesion().then(() => navigation.navigate('Inicio'))}}
                />
            </View>
        </View>
    )
}

export default VerPerfilScreen