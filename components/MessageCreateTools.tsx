import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'
import { UserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, G } from '../constants/SIZES';
import firestore from '@react-native-firebase/firestore';
import { chatRoomMetadataType, messageType, ChatRoomType } from '../Types/CHAT_ROOM_DB_types';

type RoomProp = { 
    room: string
    senderID: string
}

const MessageCreateTools: React.FC<RoomProp> = ({ room, senderID }) => {
    const [message, setMessage] = useState('')
    const user = useContext(UserContext)

    const addDataInFirestore = async () => {
        if(message.length > 0) {
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
            .then(() => {
                setMessage('')
                Keyboard.dismiss()
                // console.log('Message is sended')
            })
        } else return
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.tools}>
                <TouchableOpacity 
                    onPress={() => console.log('click on emojy icon')}>
                    <Icon name='emoticon-outline' color={COLORS.ACCENT} size={24}/>    
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
                    style={{transform: [{rotate: '315deg'}]}}
                    onPress={() => console.log('click on paperclip icon')}>
                    <Icon name='paperclip' color={COLORS.ACCENT} size={24}/>    
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => console.log('click on camera icon')}>
                    <Icon name='camera-outline' color={COLORS.ACCENT} size={24}/>    
                </TouchableOpacity>

            </View>
            {/* === microphone === */}
        </View>
    )
}
export default MessageCreateTools;

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