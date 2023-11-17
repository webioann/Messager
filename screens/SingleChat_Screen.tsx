import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Pressable, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import BottomSectionWrapper from '../components/BottomSectionWrapper';
import UserAvatarImage from '../components/UserAvatarImage';
import MessageCreateTools from '../components/MessageCreateTools';
import MessageBubble from '../components/MessageBubble';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams, UseNavigation_Type } from '../Types/navigation_types';
import { COLORS, SIZES, G } from '../constants/SIZES';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import { IMessage } from '../Types/chats_types';

type StackProps = NativeStackScreenProps<RootStackParams, 'SingleChat'>

const SingleChat_Screen: React.FC<StackProps> = ({ route }) => {
    const navigation = useNavigation<UseNavigation_Type>();
    const {sender, avatar_url, room} = route.params;
    const [ messages, setMessages ] = useState<IMessage[]>([] as IMessage[])
    // const [ timeCleanKeyboard, setTimeCleanKeyboard] = useState(false)

    const fetchMessages = async() => {
        if(room === 'room_2') {
            const data = await firestore().collection('room_2').get();
            let raw = data.docs.map((doc) => ({...doc.data()}))
            // order in data by time stamp
            const raw1 = raw.sort((a, b) => {
                if(a.time_stamp > b.time_stamp) {return 1}
                if(a.time_stamp < b.time_stamp) {return -1}
                return 0
            })
            setMessages(raw1 as IMessage [])
        }
        else return 
    }

    useEffect(() => {
        fetchMessages()
    }, [room])

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.BG}/>
        <View style={G.row}>
            <TouchableOpacity style={styles.goBackArrow} onPress={() => navigation.navigate("Chats")}>
                <Icon2 name='arrow-left' size={22} color={COLORS.ACCENT}/>
            </TouchableOpacity>
            <UserAvatarImage pathToImage={avatar_url} size={SIZES.MEDIUM}/>
            <View style={{flex: 1, paddingHorizontal: SIZES.GAP}}>
                <Text style={{color: COLORS.LIGHT, fontSize: 15, fontWeight: '600'}}>
                    { sender }
                </Text>
                <Text style={{color: COLORS.LIGHT, fontSize: 12, fontWeight: '300'}}>Gomes Sara</Text>
            </View>
            <View style={styles.call}>
                <Icon2 name='phone' size={24} color={COLORS.ACCENT}/>
            </View>
        </View>
        {/* === list of messages === */}
        <FlatList
            data={messages}
            renderItem={(message) => <MessageBubble data={message.item}/>}
            keyExtractor={item => item.time_stamp.toString()}
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
        backgroundColor: COLORS.BG,
        paddingHorizontal: SIZES.GAP,
        paddingTop:10
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

});
