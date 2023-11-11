import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Button } from 'react-native';
import React from 'react';
import BottomSectionWrapper from '../components/BottomSectionWrapper';
import UserAvatarImage from '../components/UserAvatarImage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { main_bg, contrast_bg, medium, small, main_color } from '../constants/global.styles';

const SingleChat_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#343740'}/>
        <View style={styles.chatHeader}>
            <View style={styles.goBackArrow}>
                <Icon2 name='arrow-left' size={22} color={contrast_bg}/>
            </View>
            <UserAvatarImage pathToImage='https://picsum.photos/90' size={medium}/>
            <View style={{flex: 1, paddingHorizontal: 16}}>
                <Text style={{color: main_color, fontSize: 15, fontWeight: '600'}}>Gomes Sara</Text>
                <Text style={{color: main_color, fontSize: 12, fontWeight: '300'}}>Gomes Sara</Text>
            </View>
            <View style={styles.call}>
                <Icon2 name='phone' size={24} color={contrast_bg}/>
            </View>
        </View>


        <View>
            <Text style={styles.text}>Single Chat_Screen</Text>
        </View>
        {/* bottom input and links  */}
        <BottomSectionWrapper>
            <Button
                title='Go to the Chats'
                onPress={() => navigation.navigate("Chats")}
            />

        </BottomSectionWrapper>
    </SafeAreaView>
    )
}
export default SingleChat_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: main_bg,
        paddingHorizontal: 16,
        paddingTop:10
    },
    // header field ===
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    goBackArrow: {
        width: small,
        height: small,
        borderRadius: small / 2,
        backgroundColor: '#272b34',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    contactName: {

    },
    call: {
        width: medium,
        height: medium,
        borderRadius: medium / 2,
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
        color: contrast_bg,
        fontSize: 50,
    }
});
