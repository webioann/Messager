import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UserAvatarImage from './UserAvatarImage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/UserContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/SIZES';
import firestore from '@react-native-firebase/firestore';
import { metadataType, messageType } from '../Types/chats_types';
import { UserType } from '../Types/users_types';

const Contact: React.FC<UserType> = (contact) => {
    const currentUser = useContext(UserContext)
    const navigation = useNavigation<UseNavigation_Type>();
    const [chatID, setChatID] = useState('')

    // create ROOM_ID on start
    const createChatRoomID = () => {
        if(currentUser?.uid) {
            if( contact.uid > currentUser.uid ) {
                setChatID(contact.uid.slice(0,8).concat('_@_', currentUser.uid.slice(0,8)))
            }
            if( currentUser.uid > contact.uid ) {
                setChatID(currentUser.uid.slice(0,8).concat('_@_', contact.uid.slice(0,8)))
            }
        } 
    }

    useEffect(() => {
        createChatRoomID();
    }, [])  
    
    const onStartChatting = async() => {
        let roomWasCreated = false
        await firestore().collection('CHAT_ROOM_DB').doc(chatID).get()
        .then((response) => {
            response.data() ? roomWasCreated = true : roomWasCreated = false
        })
        if( !roomWasCreated && currentUser) {
            let rawMetadata: metadataType = {
                startAt: Date.now(),
                users: [currentUser?.uid, contact.uid]
            }
            let rawMessages: messageType[] = []
            await firestore().collection('CHAT_ROOM_DB').doc(chatID).set({ 
                metadata: rawMetadata, 
                messages: rawMessages 
            })
            .then(() => { console.log('Chat room created!!!')})
            .then(() => navigation.navigate('Chat', {
                contact: contact.displayName,
                avatar_url: contact.photoURL,
                room: chatID,
                contactId: contact.uid
            }))
        }
        if( roomWasCreated ) {
            navigation.navigate('Chat', {
                contact: contact.displayName,
                avatar_url: contact.photoURL,
                room: chatID,
                contactId: contact.uid
            })
        }
    }

    return (
        <View style={styles.contact_item}>
            <UserAvatarImage pathToImage={contact.photoURL} size={50}/>
            <View style={{flex: 1}}>
                <Text style={{color: COLORS.LIGHT}}>
                    {contact.displayName}
                </Text>
                <Text style={{color: COLORS.LIGHT, fontSize: 13}}>
                    {contact.phoneNumber}
                </Text>
            </View>
            <TouchableOpacity 
                onPress={onStartChatting}>
                <Icon2 name='message-outline' size={24} color={COLORS.LIGHT}/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => console.log('Call choozed contact')}>
                <Icon2 name='phone' size={24} color={COLORS.LIGHT}/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {navigation.navigate("EditContact", {contact: contact})}}>
                <Icon name='edit' size={20} color={COLORS.LIGHT}/>
            </TouchableOpacity>
        </View>
    )
}

export default Contact;

const styles = StyleSheet.create({
    contact_item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 5
    },

})
