import { View, Image, Text } from "react-native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import emailUsuario from '../../database/funcionesfirebase'
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import firebase from '../../database/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { GiftedChat } from 'react-native-gifted-chat';
import { getFirestore, collection, doc ,addDoc, getDocs,where,deleteDoc,setDoc,getDoc,updateDoc} from 'firebase/firestore/lite';


const auth = getAuth();
const db = firebase.db;

const ChatScreen = ({ navigation }) => {

  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: auth?.currentUser.email.toString(),
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  useLayoutEffect(() => {
    const q = query(collection(db, 'Mensajes'), orderBy('createdAt'))
    const unsuscribe = db.getDocs('Mensajes').orderedBy('createdAt', 
    'desc').onSapshot(snapshot=>setMessages(
      snapshot.docs.map(doc=>({
        _id:doc.data()._id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: doc.data().user
      }))
      
    ))
    return unsuscribe;
  })

  const onSend = useCallback(async(messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      text,
      createdAt,
      user
    }=messages[0]
    const docRef = await addDoc(collection(db,'Mensajes'),{
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