import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuthentication from '../hooks/useAuthentication';
import useTimeTransformer from '../hooks/useTimeTransformer';
import { colors, sizes } from '../constants/sizes';
import { IMessage } from '../Types/chats_types';

type OneMessageProps = {
    data: IMessage
}

const Message: React.FC<OneMessageProps> = ({ data }) => {
    const user = useAuthentication()
    const newTime = useTimeTransformer(data.time_stamp)

    console.log(new Date(data.time_stamp).getHours())
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
                <Text style={styles.timeStamp}>
                    { newTime }
                </Text>
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
        color: colors.LIGHT,

    },
    timeStamp: {
        color: colors.LIGHT,
        minWidth: 40
    },
})