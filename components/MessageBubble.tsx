import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import useTimeTransformer from '../hooks/useTimeTransformer';
import { useUserContext } from '../context/UserContext';
import { COLORS, SIZES } from '../constants/SIZES';
import { messageType } from '../Types/chats_types';

type OneMessageProps = {
    message: messageType
}

const MessageBubble: React.FC<OneMessageProps> = ({ message }) => {
    const { currentUser } = useUserContext()
    const newTime = useTimeTransformer(message.createdAt)
    
    const variants = {
        backgroundColor: currentUser?.uid !== message.senderID ? COLORS.ACCENT : COLORS.DARK,
        borderBottomLeftRadius: currentUser?.uid !== message.senderID ? 8 : 0,
        borderBottomRightRadius: currentUser?.uid !== message.senderID ? 0 : 8,
    }

    return (
        <View style={[styles.cell, {justifyContent: currentUser?.uid !== message.senderID ? 'flex-end' : 'flex-start'}]}>
            { message.files.length < 1 
                ? (
                    <View style={[styles.message, variants]}>
                        <Text style={styles.messageText}>{message.text}</Text>
                        <Text style={styles.timeStamp}>
                            { newTime }
                        </Text>
                    </View>
                    )
                : (
                    <View style={[styles.imageContainer, variants]}>
                        <Image style={styles.image} resizeMode='cover' source={{uri: message.files[0]}}/>
                        <Text style={[styles.timeStamp, styles.outsideTimeStamp]}>
                            { newTime }
                        </Text>
                    </View>
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
        color: COLORS.LIGHT,
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
        color: COLORS.LIGHT,
        minWidth: 40
    },
    outsideTimeStamp: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    }
})