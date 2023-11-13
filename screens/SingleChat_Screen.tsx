import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import BottomSectionWrapper from '../components/BottomSectionWrapper';
import UserAvatarImage from '../components/UserAvatarImage';
import MessageCreateTools from '../components/MessageCreateTools';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams, UseNavigation_Type } from '../Types/navigation_types';
import { colors, sizes } from '../constants/sizes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import { IMessage } from '../Types/chats_types';

type StackProps = NativeStackScreenProps<RootStackParams, 'SingleChat'>

const SingleChat_Screen: React.FC<StackProps> = ({ route }) => {
    const navigation = useNavigation<UseNavigation_Type>();
    const {sender, avatar_url, room} = route.params;
    const [ messages, setMessages ] = useState<IMessage[]>([] as IMessage[])

    const fetchMessages = async() => {
        const data = await firestore().collection('room_2').get();
        let raw = data.docs.map((doc) => ({...doc.data()}))
        setMessages(raw as IMessage [])
    }

    useEffect(() => {
        fetchMessages()
    }, [room])

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.BG}/>
        <View style={styles.chatHeader}>
            <TouchableOpacity style={styles.goBackArrow} onPress={() => navigation.navigate("Chats")}>
                <Icon2 name='arrow-left' size={22} color={colors.ACCENT}/>
            </TouchableOpacity>
            <UserAvatarImage pathToImage={avatar_url} size={sizes.MEDIUM}/>
            <View style={{flex: 1, paddingHorizontal: sizes.GAP}}>
                <Text style={{color: colors.LIGHT, fontSize: 15, fontWeight: '600'}}>
                    { sender }
                </Text>
                <Text style={{color: colors.LIGHT, fontSize: 12, fontWeight: '300'}}>Gomes Sara</Text>
            </View>
            <View style={styles.call}>
                <Icon2 name='phone' size={24} color={colors.ACCENT}/>
            </View>
        </View>
        {/* === list of messages === */}
        <FlatList
            data={messages}
            renderItem={(message) => (
                <View style={{height: 50}}>
                    <Text style={{color: colors.LIGHT}}>{message.item.text}</Text>
                </View>
            )}
        />

        {/* bottom input and links  */}
        <BottomSectionWrapper>
            <MessageCreateTools room={room}/>
        </BottomSectionWrapper>
    </SafeAreaView>
    )
}
export default SingleChat_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
        paddingHorizontal: sizes.GAP,
        paddingTop:10
    },
    // header field ===
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    goBackArrow: {
        width: sizes.SMALL,
        height: sizes.SMALL,
        borderRadius: sizes.SMALL / 2,
        backgroundColor: '#272b34',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: sizes.GAP
    },
    contactName: {

    },
    call: {
        width: sizes.MEDIUM,
        height: sizes.MEDIUM,
        borderRadius: sizes.MEDIUM / 2,
        backgroundColor: '#272b34',
        justifyContent: 'center',
        alignItems: 'center',

    },


    // list of messages ===
    messageList: {

    },
    // bottom tools container ===
    bottomTools: {

    },


});
