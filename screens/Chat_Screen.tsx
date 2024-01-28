import { StyleSheet, View, FlatList, ActivityIndicator, SectionList, Text } from 'react-native';
import React from 'react';
import UserAvatarImage from '../components/UserAvatarImage';
import MessageInput from '../components/MessageInput';
import MessageBubble from '../components/MessageBubble';
import ScreenWrapper from './ScreenWrapper';
import NavigationHeader from '../components/NavigationHeader';
import { StackNavigatorParams } from '../Types/navigation_types';
import { SIZES } from '../constants/SIZES';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useFetchMessages from '../hooks/useFetchMessages';

type StackProps = NativeStackScreenProps<StackNavigatorParams, 'Chat'>

const Chat_Screen: React.FC<StackProps> = ({ route }) => {
    const {contact, avatar_url, room, contactId} = route.params;
    const { messages, isLoading, isError, messagesGroup } = useFetchMessages(room)

    const safeBottomPadding = () => {
        return (
            <View style={{width: '100%', height: 70}}></View>
        )
    }

    return (
    <ScreenWrapper>
        <NavigationHeader type='goBack' screen='Chat'>
            <UserAvatarImage pathToImage={avatar_url} size={SIZES.MEDIUM}/>
        </NavigationHeader>
        { isLoading 
            ? <ActivityIndicator/> 
            : <FlatList
                style={{paddingBottom: 70, paddingHorizontal: 16}}
                ListFooterComponent={safeBottomPadding}
                data={messages}
                renderItem={(message) => <MessageBubble message={message.item} room={room}/>}
                keyExtractor={item => item.createdAt.toString()}
            />
        }
        {/* { isLoading 
            ? <ActivityIndicator/> 
            : <SectionList
                style={{paddingBottom: 70, paddingHorizontal: 16}}
                sections={messagesGroup}
                renderItem={(message) => <MessageBubble message={message.item} room={room}/>}
                keyExtractor={item => item.createdAt.toString()}
                renderSectionHeader={({section: {sectionTittle}}) => (
                    <Text>{sectionTittle}</Text>
                )}
            />
        } */}

        <View style={styles.bottomSection}>
            <MessageInput room={room} senderID={contactId}/>
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
