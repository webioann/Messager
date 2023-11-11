import { StyleSheet, Pressable, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { main_bg, contrast_bg, large, kingsize, fav_gap, main_color } from '../constants/global.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';


const ChatsBottomMenu = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
        <View style={styles.menu}>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("SingleChat")}>
                <Icon2 name='message' size={24} color={contrast_bg}/>
            </TouchableOpacity>
            <View style={styles.link}>
                <Icon2 name='camera-outline' size={24} color={main_color}/>
            </View>
            <View style={styles.link}>
                <Icon name='qr-code-scanner' size={24} color={main_color}/>
            </View>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Settings")}>
                <Icon2 name='cog-outline' size={24} color={main_color}/>
            </TouchableOpacity>

        </View>
    )
};

export default ChatsBottomMenu;
//  icon variant 
{/* <View style={styles.link}>
<Icon2 name='message-outline' size={24} color={main_color}/>
</View> */}


const styles = StyleSheet.create({
    menu:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: kingsize,
        backgroundColor: 'grey',
        borderRadius: kingsize / 2,
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    link: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        borderColor: '#000000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});