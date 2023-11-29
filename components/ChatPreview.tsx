import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserAvatarImage from './UserAvatarImage';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { COLORS, SIZES } from '../constants/SIZES';
import { UserType } from '../Types/users_types';
import useChatRoomIDCreator from '../hooks/useChatRoomIDCreator';
import { UserContext } from '../context/UserContext';
import useFetchMessages from '../hooks/useFetchMessages';
import { messageType } from '../Types/chats_types';
import useTimeTransformer from '../hooks/useTimeTransformer';


const ChatPreview: React.FC<UserType> = ({...contact}) => {
    const navigation = useNavigation<UseNavigation_Type>();
    const chatRoomID = useChatRoomIDCreator(contact.uid)
    const { messages, lastMessage, lastTimeStamp } = useFetchMessages(chatRoomID)

    return (
        <TouchableOpacity 
            style={styles.previewContainer} 
            onPress={() => {
                navigation.navigate(
                    "Chat", 
                    {
                        contact: contact.displayName,
                        contactId: contact.uid,
                        avatar_url: contact.photoURL,
                        room: chatRoomID
                    }
                )}
            }>
            <UserAvatarImage pathToImage={contact.photoURL} size={SIZES.LARGE}/>
            {/* user contact-name and short message */}
            <View style={styles.userData}>
                <Text style={{ color: COLORS.LIGHT, fontSize: 15, fontWeight: '600' }}>
                    { contact.displayName }
                </Text>
                <Text style={{ color: COLORS.LIGHT, fontSize: 12 }}>
                    { lastMessage?.text }
                </Text>
            </View>
            {/* end of row time stamp and counter */}
            <View style={styles.metaData}>
                {  messages.length > 0  && (
                    <>
                        <Text style={{ color: COLORS.LIGHT}}>
                            { lastTimeStamp }
                        </Text>
                        <View style={styles.counter}>
                            <Text style={{ color: COLORS.LIGHT, paddingHorizontal: 5 }}>
                                {messages.length}
                            </Text>
                        </View>
                    </>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default ChatPreview;

const styles = StyleSheet.create({
    previewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    userData: {
        flex: 1,
        height: '100%',
        marginLeft: SIZES.GAP,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER,
    },
    metaData: {
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    counter: {
        backgroundColor: COLORS.ACCENT,
        borderRadius: 6,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 4
    },
})
