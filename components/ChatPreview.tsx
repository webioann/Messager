import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserAvatarImage from './UserAvatarImage';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { SIZES } from '../constants/SIZES';
import { UserType } from '../Types/users_types';
import useChatRoomIDCreator from '../hooks/useChatRoomIDCreator';
import useFetchMessages from '../hooks/useFetchMessages';
import { ColorSchemeContext } from '../context/ColorSchemeContext';

const ChatPreview: React.FC<UserType> = ({...contact}) => {
    const navigation = useNavigation<UseNavigation_Type>();
    const chatRoomID = useChatRoomIDCreator(contact.uid)
    const { messages, lastMessage, lastTimeStamp } = useFetchMessages(chatRoomID)
    const { COLORS } = useContext(ColorSchemeContext)

    return (
        <TouchableOpacity 
            style={[styles.previewContainer, {backgroundColor: COLORS.third}]} 
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
            <View style={[styles.userData]}>
                <Text style={{ color: COLORS.color, fontSize: 15, fontWeight: '600' }}>
                    { contact.displayName }
                </Text>
                { lastMessage 
                    ? <Text style={{ color: COLORS.tint, fontSize: 16 }}>{ lastMessage?.text }</Text>
                    : <Text style={{ color: COLORS.accent, fontSize: 16 }}>Chat created but not messages yet!</Text>
                }
            </View>
            {/* end of row time stamp and counter */}
            <View style={styles.metaData}>
                {  messages.length > 0  && (
                    <>
                        <Text style={{ color: COLORS.color}}>
                            { lastTimeStamp }
                        </Text>
                        <View style={[styles.counter, {backgroundColor: COLORS.accent}]}>
                            <Text style={{ color: COLORS.color, paddingHorizontal: 5 }}>
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
        marginTop: 10
    },
    userData: {
        flex: 1,
        height: '100%',
        marginLeft: SIZES.GAP,
        // borderBottomWidth: 1,
    },
    metaData: {
        height: '100%',
        // borderBottomWidth: 1,
    },
    counter: {
        borderRadius: 6,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 4
    },
})
