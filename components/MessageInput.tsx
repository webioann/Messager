import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'
import { UserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageUploader from './ImageUploader';
import UploadImageInStorage from './UploadImageInStorage';
import { COLORS, SIZES, G } from '../constants/SIZES';
import firestore from '@react-native-firebase/firestore';
import {  messageType } from '../Types/chats_types';

type RoomProp = { 
    room: string
    senderID: string
}

const MessageInput: React.FC<RoomProp> = ({ room, senderID }) => {
    const [message, setMessage] = useState('')
    const [image, setImage] = useState<string | undefined>(undefined)
    const user = useContext(UserContext)

    const addDataInFirestore = async () => {
        try {
            if(message.length > 0 ) {
                let newMessage: messageType = {
                    text: message,
                    senderID: senderID,
                    createdAt: Date.now(),
                    reviewed: false,
                    files: []
                } 
                await firestore().collection('CHAT_ROOM_DB').doc(room).update({
                    messages: firestore.FieldValue.arrayUnion(newMessage)
                })
            }
            if(message.length == 0 && image) {
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
        catch(error) {  }
        finally {
            setMessage('')
            setImage(undefined)
            Keyboard.dismiss()
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.tools}>
            <TouchableOpacity 
                    style={{transform: [{rotate: '315deg'}]}}
                    onPress={() => console.log('click on paperclip icon')}>
                    <Icon name='paperclip' color={COLORS.ACCENT} size={24}/>    
                </TouchableOpacity>
                <TextInput 
                    value={message}
                    onChangeText={setMessage}
                    placeholder='Type a message'
                    placeholderTextColor={COLORS.GREY}
                    cursorColor={COLORS.LIGHT}
                    multiline={true}
                    style={{flex: 1, color: COLORS.LIGHT, fontSize: 18}}/>
                <TouchableOpacity 
                    style={{transform: [{rotate: '330deg'}]}} 
                    onPress={addDataInFirestore}> 
                    <Icon name='send' color={COLORS.BLUE} size={24}/>    
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => console.log('click on camera icon')}>
                    <Icon name='camera-outline' color={COLORS.ACCENT} size={24}/>    
                </TouchableOpacity>
                <UploadImageInStorage getImageURL={setImage} uniqueName='NAME'  color={COLORS.ACCENT} size={24}/>
                {/* <ImageUploader setFilePath={setImage} color={COLORS.ACCENT} size={24}/> */}
            </View>
            {/* === microphone === */}
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
        borderColor: COLORS.GREY,
        borderStyle: 'solid',
        borderWidth: 0.5,
    },
    microphone: {
        width: SIZES.BIG,
        height: SIZES.BIG,
        borderRadius: SIZES.BIG / 2,
        backgroundColor: COLORS.ACCENT,
        justifyContent: 'center',
        alignItems: 'center'
    },
});