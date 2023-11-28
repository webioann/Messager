import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import useTimeTransformer from '../hooks/useTimeTransformer';
import { UserContext } from '../context/UserContext';
import { COLORS, SIZES } from '../constants/SIZES';
import { messageType } from '../Types/chats_types';

type OneMessageProps = {
    message: messageType
}

const MessageBubble: React.FC<OneMessageProps> = ({ message }) => {
    const user = useContext(UserContext)
    const newTime = useTimeTransformer(message.createdAt)

    return (
        <View style={[styles.cell, {justifyContent: user?.uid !== message.senderID ? 'flex-end' : 'flex-start'}]}>
            <View style={[
                styles.message, 
                { 
                    backgroundColor: user?.uid !== message.senderID ? COLORS.ACCENT : COLORS.DARK,
                    borderBottomLeftRadius: user?.uid !== message.senderID ? 8 : 0,
                    borderBottomRightRadius: user?.uid !== message.senderID ? 0 : 8,
                }]}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.timeStamp}>
                    { newTime }
                </Text>
            </View>
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
    timeStamp: {
        color: COLORS.LIGHT,
        minWidth: 40
    },
})