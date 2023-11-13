import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserAvatarImage from '../components/UserAvatarImage';
import { DummyChatsList } from '../Types/chats_types';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { colors, sizes } from '../constants/sizes';

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
            <UserAvatarImage pathToImage={data.pathToImage} size={sizes.LARGE}/>
            {/* user contact-name and short message */}
            <View style={styles.userData}>
                <Text style={{ color: colors.LIGHT, fontSize: 15, fontWeight: '600' }}>
                    { data.contactName }
                </Text>
                <Text style={{ color: colors.LIGHT, fontSize: 12 }}>
                    { data.shortMessage }
                </Text>
            </View>
            {/* end of row time stamp and counter */}
            <View style={styles.metaData}>
                <Text style={{ color: data.messageCount <= 0 ? colors.LIGHT : colors.ACCENT }}>
                    {data.timeStamp}
                </Text>
                {data.messageCount > 0 && (
                    <View style={styles.counter}>
                        <Text style={{ color: colors.LIGHT, paddingHorizontal: 5 }}>
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
        marginLeft: sizes.GAP,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    metaData: {
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    counter: {
        backgroundColor: colors.ACCENT,
        borderRadius: 6,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 4
    },
})
