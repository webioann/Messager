import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import UserAvatarImage from '../components/UserAvatarImage';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';

import { defaultAvatar } from '../constants/dummyMessages';
import { COLORS, SIZES, G } from '../constants/SIZES';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Contacts_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
        <SafeAreaView style={G.container}>
            <StatusBar backgroundColor={COLORS.BG}/>
            <View style={G.row}>
                <UserAvatarImage pathToImage={defaultAvatar} size={70}/>
                <Text style={{color: COLORS.LIGHT, fontSize: 24}}>Contacts</Text>
                <View>
                    <Icon name='edit' size={24} color={COLORS.LIGHT}/>
                </View>
            </View>
            <ScrollView>
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
                <Icon name='chevron-left' color={'#ffffff'} size={44}/>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default Contacts_Screen;

const styles = StyleSheet.create({
    container: {

    }
})