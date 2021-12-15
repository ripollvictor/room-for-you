import React from 'react'
import { View } from 'react-native'
import { GetChatsUser, GetEmailFromCurrentUser } from '../../database/helper'


const ListaContactosScreen = ({ navigation }) => {

    GetChatsUser().then(data => {
        console.log(data[0].id);
    });



    return(
        <View></View>
    )
}

export default ListaContactosScreen