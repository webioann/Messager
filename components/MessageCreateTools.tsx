import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, sizes } from '../constants/sizes';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import useAuthentification from '../hooks/useAuthentification';

type RoomProp = { room: string }

const MessageCreateTools: React.FC<RoomProp> = ({ room }) => {
    const [message, setMessage] = useState('')
    const user = useAuthentification()

    // const createUser = () => {
    //     auth().createUserWithEmailAndPassword('newuseragantttt@gmail.com', '123topic')
    //     .then(() => console.log(auth().currentUser))
    //     .then(() => Alert.alert('User is created'))
    //     .catch(error => console.log(error))
    // }

    const addDataInFirestore = async () => {
        await firestore().collection(room).add({
            text: message,
            room: room,
            author: user?.name,
            sender_id: user?.user_id,
            avatar_url: user?.photoURL,
            time_stamp: Date.now(),
            reviewed: false,
            file: null
        })
        .then(() => setMessage(''))
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.tools}>
                <TouchableOpacity 
                    onPress={() => Alert.alert('click on microphone')}>
                    <Icon name='emoticon-outline' color={colors.ACCENT} size={24}/>    
                </TouchableOpacity>

                <TextInput 
                    value={message}
                    onChangeText={setMessage}
                    placeholder='Type a message'
                    placeholderTextColor={colors.GREY}
                    cursorColor={colors.LIGHT}
                    style={{flex: 1, color: colors.LIGHT, fontSize: 18}}/>

                <TouchableOpacity 
                    style={styles.paperclip}
                    onPress={() => Alert.alert('click on paperclip')}>
                    <Icon name='paperclip' color={colors.ACCENT} size={24}/>    
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => Alert.alert('click on camera')}>
                    <Icon name='camera-outline' color={colors.ACCENT} size={24}/>    
                </TouchableOpacity>

            </View>
            {/* === microphone === */}
            <TouchableOpacity 
                style={styles.microphone} 
                // onPress={() => Alert.alert('click on microphone')}>
                onPress={addDataInFirestore}>
                <Icon name='microphone' color={colors.LIGHT} size={24}/>    
            </TouchableOpacity>
        </View>
    )
}
export default MessageCreateTools;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    tools: {
        flex: 1,
        borderRadius: sizes.BIG / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        gap: 10,
        paddingHorizontal: 14,
        borderColor: colors.GREY,
        borderStyle: 'solid',
        borderWidth: 0.5,
    },
    paperclip: {
        transform: [{rotate: '315deg'}]
    },
    microphone: {
        width: sizes.BIG,
        height: sizes.BIG,
        borderRadius: sizes.BIG / 2,
        backgroundColor: colors.ACCENT,
        justifyContent: 'center',
        alignItems: 'center'
    },
});