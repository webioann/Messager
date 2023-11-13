import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAuthentification from '../hooks/useAuthentification';
import { colors, sizes } from '../constants/sizes';
import { IMessage } from '../Types/chats_types';

type OneMessageProps = {
    data: IMessage
}

const Message: React.FC<OneMessageProps> = ({ data }) => {
    const user = useAuthentification()

    return (
        <View style={[styles.cell, {justifyContent: user ? 'flex-end' : 'flex-start'}]}>
            <View style={[
                styles.message, 
                { 
                    backgroundColor: user ? colors.ACCENT : colors.DARK,
                    borderBottomLeftRadius: user ? 8 : 0,
                    borderBottomRightRadius: user ? 0 : 8,
                }]}>
                <Text style={styles.messageText}>{data.text}</Text>
                <Text style={styles.timeStamp}>{data.time_stamp}</Text>
            </View>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        marginTop: sizes.GAP
    },
    message: {
        padding: 8 ,
        maxWidth: "80%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8
    },
    messageText: {
        // flex: 1,
        color: colors.LIGHT,

    },
    timeStamp: {
        color: colors.LIGHT
    },
})