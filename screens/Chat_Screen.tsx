import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import React from 'react';
import UserAvatarImage from '../components/UserAvatarImage';
import MessageCreateTools from '../components/MessageInput';
import MessageBubble from '../components/MessageBubble';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams, UseNavigation_Type } from '../Types/navigation_types';
import { COLORS, SIZES, G } from '../constants/SIZES';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useFetchMessages from '../hooks/useFetchMessages';

type StackProps = NativeStackScreenProps<RootStackParams, 'Chat'>

const Chat_Screen: React.FC<StackProps> = ({ route }) => {
    const navigation = useNavigation<UseNavigation_Type>();
    const {contact, avatar_url, room, contactId} = route.params;
    const { messages, isLoading, isError } = useFetchMessages(room)

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.BG}/>
        <View style={[G.row, {paddingBottom: 16}]}>
            <TouchableOpacity style={styles.goBackArrow} onPress={() => navigation.navigate("Chats")}>
                <Icon2 name='arrow-left' size={22} color={COLORS.ACCENT}/>
            </TouchableOpacity>
            <UserAvatarImage pathToImage={avatar_url} size={SIZES.MEDIUM}/>
            <View style={{flex: 1, paddingHorizontal: SIZES.GAP}}>
                <Text style={{color: COLORS.LIGHT, fontSize: 15, fontWeight: '600'}}>
                    { contact }
                </Text>
                <Text style={{color: COLORS.LIGHT, fontSize: 12, fontWeight: '300'}}>Gomes Sara</Text>
            </View>
            <View style={styles.call}>
                <Icon2 name='phone' size={24} color={COLORS.ACCENT}/>
            </View>
        </View>
        {/* === list of messages === */}
            { isLoading 
                ? <ActivityIndicator/> 
                : <FlatList
                    style={{paddingBottom: 70}}
                    data={messages}
                    renderItem={(message) => <MessageBubble message={message.item}/>}
                    keyExtractor={item => item.createdAt.toString()}
                />
            }
        {/* bottom input and links  */}
        <View style={styles.bottomSection}>
            <MessageCreateTools room={room} senderID={contactId}/>
        </View>
    </SafeAreaView>
    )
}
export default Chat_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141627',
        paddingHorizontal: SIZES.GAP,
        paddingTop:10,
        paddingBottom: 77
    },
    // header field ===
    goBackArrow: {
        width: SIZES.SMALL,
        height: SIZES.SMALL,
        borderRadius: SIZES.SMALL / 2,
        backgroundColor: '#272b34',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.GAP
    },
    call: {
        width: SIZES.MEDIUM,
        height: SIZES.MEDIUM,
        borderRadius: SIZES.MEDIUM / 2,
        backgroundColor: '#272b34',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSection: {
        ...G.fixedOnBottom
    }
});
