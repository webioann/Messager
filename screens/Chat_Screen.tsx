import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import UserAvatarImage from '../components/UserAvatarImage';
import MessageCreateTools from '../components/MessageInput';
import MessageBubble from '../components/MessageBubble';
import ScreenWrapper from './ScreenWrapper';
import NavigationHeader from '../components/NavigationHeader';
import { RootStackParams } from '../Types/navigation_types';
import { SIZES, G } from '../constants/SIZES';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useFetchMessages from '../hooks/useFetchMessages';

type StackProps = NativeStackScreenProps<RootStackParams, 'Chat'>

const Chat_Screen: React.FC<StackProps> = ({ route }) => {
    const {contact, avatar_url, room, contactId} = route.params;
    const { messages, isLoading, isError } = useFetchMessages(room)

    return (
    <ScreenWrapper>
        <NavigationHeader title={`chat with ${contact}`}>
            <UserAvatarImage pathToImage={avatar_url} size={SIZES.MEDIUM}/>
        </NavigationHeader>
        { isLoading 
            ? <ActivityIndicator/> 
            : <FlatList
                style={{paddingBottom: 70}}
                data={messages}
                renderItem={(message) => <MessageBubble message={message.item}/>}
                keyExtractor={item => item.createdAt.toString()}
            />
        }
        <View style={styles.bottomSection}>
            <MessageCreateTools room={room} senderID={contactId}/>
        </View>
    </ScreenWrapper>
    )
}
export default Chat_Screen;

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#141627',
    //     paddingHorizontal: SIZES.GAP,
    //     paddingTop:10,
    //     paddingBottom: 77
    // },
    // // header field ===
    // goBackArrow: {
    //     width: SIZES.SMALL,
    //     height: SIZES.SMALL,
    //     borderRadius: SIZES.SMALL / 2,
    //     backgroundColor: '#272b34',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginRight: SIZES.GAP
    // },
    // call: {
    //     width: SIZES.MEDIUM,
    //     height: SIZES.MEDIUM,
    //     borderRadius: SIZES.MEDIUM / 2,
    //     backgroundColor: '#272b34',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    bottomSection: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,

    }
});
