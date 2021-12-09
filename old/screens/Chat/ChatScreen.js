import { View, Image, Text } from "react-native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import emailUsuario from '../../database/funcionesfirebase'
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import { db, auth } from '../../database/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { onSnapshot, collection, orderBy, query } from "@firebase/firestore/";
import {addDoc} from 'firebase/firestore';



const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  const uploadMessages = async (id,text,created,user) => {
    let u = user._id;
    console.log(created)
    await addDoc(collection(db, 'Mensajes'), {
      _id: id,
      text: text,
      createdAt: created,
      user: user
    })
  }

  const getMessages = async () => {
    const unsuscribe = onSnapshot(query(collection(db, 'Mensajes'), orderBy('createdAt', 'desc')), (snapshot) => setMessages(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: doc.data().user
      }))

    ), (error) => {
      console.log('err')
    })
    return unsuscribe;
  }

  useLayoutEffect(() => {
    const timeOutId = setTimeout(() => getMessages(), 7000);
    return () => clearTimeout(timeOutId);
  })

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    uploadMessages(messages[0]._id, messages[0].text, messages[0].createdAt, messages[0].user);
  }, [])





  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser.email,
      }}
    />
  )
}







export default ChatScreen