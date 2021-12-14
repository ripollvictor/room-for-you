import { View, Image, Text } from "react-native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import emailUsuario from '../../database/funcionesfirebase'
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import { db, auth } from '../../database/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import {addDoc, onSnapshot, collection, orderBy, query, where } from "@firebase/firestore";



const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  

  useLayoutEffect(() => {
  const q = query(collection(db, "Mensajes"), where("user", "==", "ripollaltea@gmail.com"), where("receiver", "==", "diego.ruiz.2000@hotmail.com"), orderBy('createdAt', 'desc'))
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
    const { _id, createdAt, text, user} = messages[0];    
    addDoc(collection(db, 'Mensajes'), {
      _id,
      createdAt,
      text,
      user: "ripollaltea@gmail.com",
      receiver: "diego.ruiz.2000@hotmail.com"
    });  
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