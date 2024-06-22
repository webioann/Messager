import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import UploadImageInStorage from './UploadImageInStorage';
import { SIZES, G } from '../constants/SIZES';
import firestore from '@react-native-firebase/firestore';
import {  messageType } from '../Types/chats_types';

type RoomProp = { 
    room: string
    senderID: string
}

const MessageInput: React.FC<RoomProp> = ({ room, senderID }) => {
    const [message, setMessage] = useState('')
    const [image, setImage] = useState<string | undefined>(undefined)
    const { COLORS } = useColorSchemeContext()

    const sendMessageInFirestore = async () => {
        try {
            if(message.length > 0 ) {
                let newMessage: messageType = {// <--- fill message object
                    text: message,
                    senderID: senderID,
                    createdAt: Date.now(),
                    reviewed: false,
                    files: []
                } 
                await firestore().collection('CHAT_ROOM_DB').doc(room).update({// <--- push new message in array
                    messages: firestore.FieldValue.arrayUnion(newMessage)
                })
            }
        }
        catch(error) {  }
        finally {
            setMessage('')
            Keyboard.dismiss()
        }
    }

    const saveImageInFirestore = async() => {
        try {
            if(image) {
                let newMessage: messageType = {
                    text: '',
                    senderID: senderID,
                    createdAt: Date.now(),
                    reviewed: false,
                    files: [image]
                } 
                await firestore().collection('CHAT_ROOM_DB').doc(room).update({
                    messages: firestore.FieldValue.arrayUnion(newMessage)
                })
            }
            else return
        }
        catch (error) {}
        finally { setImage(undefined) }
    }

    useEffect(() => {
        saveImageInFirestore();
    }, [image])

    return (
        <View style={styles.wrapper}>
            <View style={[styles.tools, {borderColor: COLORS.tint, backgroundColor: COLORS.main}]}>
            <TouchableOpacity 
                    style={{transform: [{rotate: '315deg'}]}}
                    onPress={() => console.log('click on paperclip icon')}>
                    <Icon name='paperclip' color={COLORS.orange} size={24}/>    
                </TouchableOpacity>
                <TextInput 
                    value={message}
                    onChangeText={setMessage}
                    placeholder='Type a message'
                    placeholderTextColor={COLORS.tint}
                    cursorColor={COLORS.color}
                    multiline={true}
                    style={{flex: 1, color: COLORS.color, fontSize: 18}}/>
                <TouchableOpacity 
                    style={{transform: [{rotate: '330deg'}]}} 
                    onPress={sendMessageInFirestore}> 
                    <Icon name='send' color={COLORS.blue} size={24}/>    
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => console.log('click on camera icon')}>
                    <Icon name='camera-outline' color={COLORS.orange} size={24}/>    
                </TouchableOpacity>
                <UploadImageInStorage getImageURL={setImage} storageFolder='messages'>
                    <Icon2 name='photo' color={COLORS.orange} size={24}/>
                </UploadImageInStorage>
            </View>
        </View>
    )
}
export default MessageInput;

const styles = StyleSheet.create({
    wrapper: {
        ...G.row,
        paddingHorizontal: 10,
    },
    tools: {
        flex: 1,
        borderRadius: SIZES.BIG / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        gap: 10,
        paddingHorizontal: 14,
        borderStyle: 'solid',
        borderWidth: 0.5,
    },
});