import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserAvatarImage from './UserAvatarImage';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { COLORS, SIZES } from '../constants/SIZES';
import { UserType } from '../Types/users_types';
import useChatRoomIDCreator from '../hooks/useChatRoomIDCreator';
import { UserContext } from '../context/UserContext';

// type DummyChatsList = {
//     room: string
//     pathToImage: string
//     contactName: string
//     shortMessage: string
//     timeStamp: string
//     messageCount: number
// }

const ChatPreview: React.FC<UserType> = ({...data}) => {
    const navigation = useNavigation<UseNavigation_Type>();
    // const currentUser = useContext(UserContext)
    const chatRoomID = useChatRoomIDCreator(data.uid)

    return (
        <TouchableOpacity 
            style={styles.previewContainer} 
            onPress={() => {
                navigation.navigate(
                    "Chat", 
                    {
                        contact: data.displayName,
                        contactId: data.uid,
                        avatar_url: data.photoURL,
                        room: chatRoomID
                    }
                )}
            }>
            <UserAvatarImage pathToImage={data.photoURL} size={SIZES.LARGE}/>
            {/* user contact-name and short message */}
            <View style={styles.userData}>
                <Text style={{ color: COLORS.LIGHT, fontSize: 15, fontWeight: '600' }}>
                    { data.displayName }
                </Text>
                <Text style={{ color: COLORS.LIGHT, fontSize: 12 }}>
                    THIS IS SHORT MESSAGE
                </Text>
            </View>
            {/* end of row time stamp and counter */}
            {/* <View style={styles.metaData}>
                <Text style={{ color: data.messageCount <= 0 ? COLORS.LIGHT : COLORS.ACCENT }}>
                    {data.timeStamp}
                </Text>
                {data.messageCount > 0 && (
                    <View style={styles.counter}>
                        <Text style={{ color: COLORS.LIGHT, paddingHorizontal: 5 }}>
                            {data.messageCount}
                        </Text>
                    </View>
                )}
            </View> */}
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
