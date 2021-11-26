import { View, Image, Text } from "react-native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import emailUsuario from '../../database/funcionesfirebase'
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import {db} from '../../database/firebase'

const ChatScreen = ({navigation}) => {
    const [messages, setMessages] = useState([]);
    // useEffect(() => {
    //     setMessages([
    //       {
    //         _id: 1,
    //         text: 'Hello developer',
    //         createdAt: new Date(),
    //         user: {
    //           _id: 2,
    //           name: 'React Native',
    //           avatar: 'https://placeimg.com/140/140/any',
    //         },
    //        },
    //      ])
    //    }, [])

    // useLayoutEffect(() => {
    //     const unsuscribe = db.collections('chats').orderedBy('createdAt', 
    //     'desc').onSnapshot(snaphot=>setMessages(
    //         snapshot.docs.map(doc=>({
    //             _id,
    //             createdAt,
    //             text,
    //             user
    //         }))
    //     ))
    //     return unsuscribe;
    // },[]) todo



      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0]
        // db.collection('chats').add(
        //     _id,
        //     createdAt,
        //     text,
        //     user
        // ) TODO
        
      }, [])
    


    

    return(
        
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                  _id: 1
                  //_id: getIdCurrentUser TODO
                  //name: 

                }}
            />
           

       
    )

}




export default ChatScreen