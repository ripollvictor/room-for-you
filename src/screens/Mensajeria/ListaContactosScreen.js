import React, { useState, useEffect } from 'react'
import { View, SectionList, FlatList, Button } from 'react-native'
import { GetChatsUser, GetEmailOfertador } from '../../database/helper'
import { ViewImgShadow, DefaultButton } from '../../components/elements/Button'
import { variables } from '../../styles/variables'
import { global } from '../../styles/global'



const ListaContactosScreen = ({ navigation }) => {

    const [UserChat, setUserChat] = useState([]);
    const [lista, setLista] = useState([])

    useEffect(() => {
        if (UserChat.length > 0) {

            let nuevaLista = []

            UserChat.forEach((user, index) => {
                nuevaLista.push(<DefaultButton key={index} title={user.Nombre + ' ' + user.Apellidos} marginBottom={variables.spaceBetweenElems} func={() => {AbrirChat(user.Email)}} />)
            })

            setLista(nuevaLista)
        }
    }, [UserChat])
    
    useEffect(() => {
        GetChatsUser().then(data => {
            setUserChat(data)
        })
    }, [])

    const AbrirChat = async (ofertador) => {
        navigation.navigate('Chat', {emailOfertador: ofertador})
    }

    return(
        <View style={[global.default, {paddingTop: 100}]}>
            {lista}
        </View>
    )
}

export default ListaContactosScreen