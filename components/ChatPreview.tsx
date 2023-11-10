import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserAvatarImage from '../components/UserAvatarImage';
import { ChatData_Type } from '../Types/chats_types';
import { main_bg, contrast_bg, large, medium, fav_gap, main_color } from '../constants/global.styles';

const ChatPreview: React.FC<ChatData_Type> = ({...data}) => {
    return (
        <View style={styles.previewContainer}>
            <UserAvatarImage pathToImage={data.pathToImage} size={large}/>

            {/* user contact-name and short message */}
            <View style={styles.userData}>
                <Text style={{ color: main_color, fontSize: 15, fontWeight: '600' }}>
                    { data.contactName }
                </Text>
                <Text style={{ color: main_color, fontSize: 12 }}>
                    { data.shortMessage }
                </Text>
            </View>

            {/* end of row */}
            <View style={styles.timeStamp}>
                <Text>{data.timeStamp}</Text>
                <Text>{data.messageCount}</Text>
            </View>
        </View>
    )
}

export default ChatPreview;

const styles = StyleSheet.create({
    previewContainer: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    userData: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'

    },
    timeStamp: {
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'

    },
})
