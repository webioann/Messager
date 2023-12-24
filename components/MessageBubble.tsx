import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import useTimeTransformer from '../hooks/useTimeTransformer';
import { useUserContext } from '../context/UserContext';
import { SIZES } from '../constants/SIZES';
import { messageType } from '../Types/chats_types';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


type OneMessageProps = {
    message: messageType
    room: string
}

const MessageBubble: React.FC<OneMessageProps> = ({ message, room }) => {
    const { currentUser } = useUserContext()
    const newTime = useTimeTransformer(message.createdAt)
    const { COLORS } = useColorSchemeContext()
    const [isOpened, setIsOpened] = useState(false)

    const variants = {
        backgroundColor: currentUser?.uid !== message.senderID ? COLORS.accent : COLORS.adorn,
        borderBottomLeftRadius: currentUser?.uid !== message.senderID ? 8 : 0,
        borderBottomRightRadius: currentUser?.uid !== message.senderID ? 0 : 8,
    }

    const deleteMessage = async() => {
        let raw = await firestore().collection('CHAT_ROOM_DB').doc(room).get()
        let allMessages = raw.data()
        if ( allMessages !== undefined ) {
            let temp: messageType[] = [...allMessages.messages]
            let messageObjectForDelete = temp.filter((item: messageType) => item.createdAt === message.createdAt)
            await firestore().collection('CHAT_ROOM_DB').doc(room).update({
                messages: firestore.FieldValue.arrayRemove(messageObjectForDelete[0])
            })
            setIsOpened(false)
        }
        else return
    }

    return (
        <View style={[styles.cell, {justifyContent: currentUser?.uid !== message.senderID ? 'flex-end' : 'flex-start'}]}>
            { isOpened && <Pressable 
                onPress={deleteMessage}
                style={[styles.delete, {}, {
                    left: currentUser?.uid === message.senderID ? null : 0 , 
                    right: currentUser?.uid === message.senderID ? 0 : null,
                    backgroundColor: variants.backgroundColor
                }]}
            >
                <Icon name='delete-outline' size={24} color={COLORS.orange}/>
            </Pressable>}
            { message.files.length < 1 
                ? (
                    <Pressable 
                        onLongPress={() => setIsOpened(true)}
                        onPress={() => setIsOpened(false)}
                        style={[styles.message, variants]}
                        >
                        <Text style={[styles.messageText, {color: COLORS.white}]}>{message.text}</Text>
                        <Text style={[styles.timeStamp, {color: COLORS.white}]}>
                            { newTime }
                        </Text>
                    </Pressable>
                    )
                : (
                    <Pressable 
                        onLongPress={() => setIsOpened(true)}
                        onPress={() => setIsOpened(false)}
                        style={[styles.imageContainer, variants]}
                        >
                        <Image style={styles.image} resizeMode='cover' source={{uri: message.files[0]}}/>
                        <Text style={[styles.timeStamp, styles.outsideTimeStamp, {color: COLORS.white}]}>
                            { newTime }
                        </Text>
                    </Pressable>
                )    
            }
        </View>
    )
}

export default MessageBubble;

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        marginTop: SIZES.GAP,
        position: 'relative'
    },
    delete: {
        position: 'absolute',
        backgroundColor: 'blue',
        padding: 5,
        borderRadius: 5
    },
    message: {
        padding: 8 ,
        maxWidth: "90%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 8
    },
    messageText: {
        maxWidth: '80%',
        lineHeight: 19
    },
    imageContainer: {
        width: "80%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: 'relative',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 300
    },
    timeStamp: {
        minWidth: 40
    },
    outsideTimeStamp: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    }
})