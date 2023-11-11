import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UserAvatarImage from '../components/UserAvatarImage';
import { ChatData_Type } from '../Types/chats_types';
import { contrast_bg, large, main_color } from '../constants/global.styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';

const ChatPreview: React.FC<ChatData_Type> = ({...data}) => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
        <TouchableOpacity 
            style={styles.previewContainer} 
            onPress={() => navigation.navigate("SingleChat")}>
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
            {/* end of row time stamp and counter */}
            <View style={styles.metaData}>
                <Text style={{ color: data.messageCount <= 0 ? main_color : contrast_bg }}>
                    {data.timeStamp}
                </Text>
                {data.messageCount > 0 && (
                    <View style={styles.counter}>
                        <Text style={{ color: main_color, paddingHorizontal: 5 }}>
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
        marginLeft: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    metaData: {
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    counter: {
        backgroundColor: contrast_bg,
        borderRadius: 6,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 4
    },
})
