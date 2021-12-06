import { View, Image, Text } from "react-native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import emailUsuario from '../../database/funcionesfirebase'
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import firebase from '../../database/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { onSnapshot , collection, orderBy, query} from "@firebase/firestore/";
import { getFirestore,get,limit, doc, addDoc, getDocs, where, deleteDoc, setDoc, getDoc, updateDoc } from 'firebase/firestore/lite';


const auth = getAuth();
const db = firebase.db;


const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'hola',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  // async function  actChat() {
  //   const q = query(collection(db, 'Mensajes'), orderBy('createdAt', 'desc'))
  //   const a = await getDocs(q)
  //   console.log(a)
  //   for (let i = 0; 1 < q.length; i++) {
  //       setMessages([
  //         {
  //           _id: a[i]._id,
  //           text:  a[i].text,
  //           createdAt: new Date(),
  //           user: {
  //             _id: 2,
  //             name: 'React Native'
  //           },
  //         },
  //       ])
     
      
  //   }
  // }

  useEffect(() => {
  //  const q = query(collection(db, 'Mensajes'), orderBy('createdAt', 'desc'))
    //console.log(q)
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
  })

  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      text,
      createdAt,
      user
    } = messages[0]
    console.log(messages)
    const docRef = await addDoc(collection(db, 'Mensajes'), {
      _id,
      text,
      createdAt,
      user
    })
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