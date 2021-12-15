import React, { useState } from 'react'
import { View, SectionList, FlatList, Button } from 'react-native'
import { GetChatsUser, GetEmailFromCurrentUser } from '../../database/helper'


const ListaContactosScreen = ({ navigation }) => {

    const [UserChat, setUserChat] = useState([]);

    GetChatsUser().then(data => {
        setUserChat[data];
    });

}

export default ListaContactosScreen