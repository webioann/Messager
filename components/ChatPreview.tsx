import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserAvatarImage from './UserAvatarImage';
import { DummyChatsList } from '../Types/chats_types';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { COLORS, SIZES } from '../constants/SIZES';

const ChatPreview: React.FC<DummyChatsList> = ({...data}) => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
        <TouchableOpacity 
            style={styles.previewContainer} 
            onPress={() => {
                navigation.navigate(
                    "SingleChat", 
                    {
                        sender: data.contactName,
                        avatar_url: data.pathToImage,
                        room: data.room
                    }
                )}
            }>
            <UserAvatarImage pathToImage={data.pathToImage} size={SIZES.LARGE}/>
            {/* user contact-name and short message */}
            <View style={styles.userData}>
                <Text style={{ color: COLORS.LIGHT, fontSize: 15, fontWeight: '600' }}>
                    { data.contactName }
                </Text>
                <Text style={{ color: COLORS.LIGHT, fontSize: 12 }}>
                    { data.shortMessage }
                </Text>
            </View>
            {/* end of row time stamp and counter */}
            <View style={styles.metaData}>
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
        borderBottomColor: '#333333',
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
