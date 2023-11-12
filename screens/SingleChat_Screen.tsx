import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import BottomSectionWrapper from '../components/BottomSectionWrapper';
import UserAvatarImage from '../components/UserAvatarImage';
import MessageCreateTools from '../components/MessageCreateTools';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { colors, sizes } from '../constants/sizes';

const SingleChat_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.BG}/>
        <View style={styles.chatHeader}>
            <TouchableOpacity style={styles.goBackArrow} onPress={() => navigation.navigate("Chats")}>
                <Icon2 name='arrow-left' size={22} color={colors.ACCENT}/>
            </TouchableOpacity>
            <UserAvatarImage pathToImage='https://picsum.photos/90' size={sizes.MEDIUM}/>
            <View style={{flex: 1, paddingHorizontal: sizes.GAP}}>
                <Text style={{color: colors.LIGHT, fontSize: 15, fontWeight: '600'}}>Gomes Sara</Text>
                <Text style={{color: colors.LIGHT, fontSize: 12, fontWeight: '300'}}>Gomes Sara</Text>
            </View>
            <View style={styles.call}>
                <Icon2 name='phone' size={24} color={colors.ACCENT}/>
            </View>
        </View>


        <View>
            <Text style={styles.text}>Single Chat_Screen</Text>
        </View>
        {/* bottom input and links  */}
        <BottomSectionWrapper>
            <MessageCreateTools/>
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



    text: {
        color: colors.ACCENT,
        fontSize: 50,
    }
});
