import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { GetEmailFromCurrentUser } from '../../database/helper'
import firebase from '../../database/conection'
import { GiftedChat } from 'react-native-gifted-chat';
import { addDoc, onSnapshot, collection, orderBy, query, where } from "@firebase/firestore";



const ChatScreen = ({ navigation, route }) => {
    const { emailOfertador } = route.params
    const [messages, setMessages] = useState([]);

    const db = firebase.db;

    useLayoutEffect(() => {
        const q = query(collection(db, "Mensajes"),where("receiver", "in", [emailOfertador+"//"+GetEmailFromCurrentUser(), GetEmailFromCurrentUser()+"//"+emailOfertador]), orderBy('createdAt', 'desc'))
        const unsuscribe = onSnapshot(q, (snapshot) =>
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    text: doc.data().text,
                    createdAt: doc.data().createdAt.toDate(),
                    user: doc.data().user,
                    receiver: doc.data().receiver
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
            user, 
            receiver: emailOfertador+"//"+GetEmailFromCurrentUser()
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