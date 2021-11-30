import React from 'react'
import { View } from 'react-native'
import {GetFavoritos, GetEmailFromCurrentUser, GetUserIdFromEmail} from '../../../old/database/helper'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { screenStyles } from './styles'
import Button from "../../../old/components/Button/Button"
import {getDocs} from 'firebase/firestore/lite'

const VerFavoritosScreen = () => {

const GetDocsFrom = (collectionName, fieldName, value) => {
        return getDocs(
            query(
                collection(db, collectionName),
                where(fieldName, '==', value)
            )
        )
}

const GetFavoritos = async () => {
    const email = GetEmailFromCurrentUser()

    const p_UserId = GetUserIdFromEmail(email)
    const r_UserId = await p_UserId

    const userRef = doc(db, 'Usuario', r_UserId)

    const p_Favoritos = GetDocsFrom('Solicitud', 'id_usuario', userRef)
    const r_Favoritos = await p_Favoritos

    console.log(r_Favoritos.docs)
    return r_Favoritos.docs
}

    return(
        GetFavoritos()
    )
}

export default VerFavoritosScreen