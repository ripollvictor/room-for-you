import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { View } from 'react-native';
import { GetEmailFromCurrentUser } from '../../database/helper'
import firebase from '../../database/conection'
import { GiftedChat, InputToolbar, SystemMessage, Composer, Send, Day, Message, Bubble, MessageText } from 'react-native-gifted-chat';
import { addDoc, onSnapshot, collection, orderBy, query, where } from "@firebase/firestore";
import { variables } from '../../styles/variables'
import { colors } from '../../styles/colors'
import { global } from '../../styles/global';
import { ViewImgShadow } from '../../components/elements/Button';
import { render } from 'react-dom';

const CustomInputText = props => {
    return(
        <View style={{
            flex: 1,
            //marginBottom: 39,
            marginHorizontal: 24,
            borderWidth: 2,
            borderRadius: variables.borderRadius,
            backgroundColor: colors.white
        }}>
            <Composer
                {...props}
                placeholder='Escribir...'
                textInputStyle={{
                    fontFamily: 'nk57-monospace',
                    fontSize: 11,
                }}
                minComposerHeight={50}
                multiline={true}
            />
        </View>
        
    )
}

const CustomSendButton = props => {

    return(
        <Send
            {...props}
            containerStyle={{
                //marginBottom: 39,
                marginRight: 24,
            }}
            alwaysShowSend={true}
        >
            <ViewImgShadow
                imgSource={require('../../../assets/icons/upload.png')} 
                widthContianer={52}
                heightContianer={52}
                widthImg={22}
                heightImg={27}
                backgroundColor={colors.secondary}
            />
        </Send>
    )
}

const CustomInputContainer = props => {
    return(
        <InputToolbar
            {...props}

            containerStyle={{
                backgroundColor: 'transparent',
                borderTopWidth: 0,
            }}

            renderComposer = {p => CustomInputText(p)}
            renderSend = {p => CustomSendButton(p)}
        />
    )
}

const CustomDay = props => {
    return(
        <Day
            {...props}
            textStyle={{
                fontFamily: 'nk57-monospace',
                fontSize: 11,
            }}
        />
    )
}

const CustomBubble = props => {
    return(
        <Bubble
            {...props}

            wrapperStyle={{
                left: {
                    borderColor: colors.black,
                    borderWidth: 2,
                    backgroundColor: colors.white,
                    color: colors.black,
                    padding: 6,
                    marginBottom: 20,
                    borderRadius: variables.borderRadius
                },
                right: {
                    borderColor: colors.primary,
                    borderWidth: 2,
                    backgroundColor: colors.white,
                    color: colors.black,
                    padding: 6,
                    marginBottom: 20,
                    borderRadius: variables.borderRadius
                }
            }}

            containerToNextStyle={{
                left: {
                    borderBottomLeftRadius: variables.borderRadius
                },
                right: {
                    borderBottomRightRadius: variables.borderRadius
                }
            }}

            containerToPreviousStyle={{
                left: {
                    borderTopLeftRadius: variables.borderRadius
                },
                right: {
                    borderTopRightRadius: variables.borderRadius
                }
            }}

            renderMessageText= {props => CustomMessage(props)}
            renderTime = {() => {}}
        />
    )
}

const CustomMessage = props => {
    return(
        <MessageText
            {...props}

            customTextStyle={{
                fontFamily: 'nk57-monospace',
                fontSize: 12,
                color: colors.black
            }}
        />
    )
}

const ChatScreen = ({ navigation, route }) => {
    const { emailOfertador } = route.params
    const emailCurrentUser = GetEmailFromCurrentUser()
    const [messages, setMessages] = useState([]);

    const db = firebase.db

    useLayoutEffect(() => {
        const q = query(collection(db, "Mensajes"),where("receiver", "in", [emailOfertador + "//" + emailCurrentUser, emailCurrentUser + "//" + emailOfertador]), orderBy('createdAt', 'desc'))
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
            receiver: emailOfertador + "//" + emailCurrentUser
        });
    }, [])

    return (
        <View style={{
            flex: 1,
            paddingBottom: 39
        }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: emailCurrentUser,
                }}
                renderInputToolbar= {props => CustomInputContainer(props)}
                alignTop={true}
                renderDay={props => CustomDay(props)}
                renderBubble = {props => CustomBubble(props)}
                renderAvatar= {() => {}}
            />
        </View>
    )
}
export default ChatScreen