import { StyleSheet, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
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

    const safeBottomPadding = () => {
        return (
            <View style={{width: '100%', height: 70}}></View>
        )
    }

    return (
    <ScreenWrapper>
        <NavigationHeader title={`chat with ${contact}`}>
            <UserAvatarImage pathToImage={avatar_url} size={SIZES.MEDIUM}/>
        </NavigationHeader>
        { isLoading 
            ? <ActivityIndicator/> 
            : <FlatList
                style={{paddingBottom: 70}}
                ListFooterComponent={safeBottomPadding}
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
