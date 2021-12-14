import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { GetEmailFromCurrentUser } from '../../database/helper'
import firebase from '../../database/conection'
import { GiftedChat } from 'react-native-gifted-chat';
import { addDoc, onSnapshot, collection, orderBy, query } from "@firebase/firestore";



const ChatScreen = ({ navigation, route }) => {
    const { emailOfertador } = route.params
    const [messages, setMessages] = useState([]);

    const db = firebase.db

    const uploadMessages = async (id, text, created, user) => {
        await addDoc(collection(db, 'Mensajes'), {
            _id: id,
            text: text,
            createdAt: created,
            user: user
        })
        console.log(id);
    }

    const getMessages = async () => {
        const q = query(collection(db, "Mensajes"), orderBy('createdAt', 'desc'))
        const unsuscribe = onSnapshot(q, (snapshot) =>
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    text: doc.data().text,
                    createdAt: doc.data().createdAt.toDate(),
                    user: doc.data().user
                }))
            ));
    }

    useLayoutEffect(() => {
        const q = query(collection(db, "Mensajes"), orderBy('createdAt', 'desc'))
        const unsuscribe = onSnapshot(q, (snapshot) =>
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    text: doc.data().text,
                    createdAt: doc.data().createdAt.toDate(),
                    user: doc.data().user
                }))
            ));
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(db, 'Mensajes'), {
            _id,
            createdAt,
            text,
            user
        });
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: GetEmailFromCurrentUser(),
            }}
        />
    )
}
export default ChatScreen