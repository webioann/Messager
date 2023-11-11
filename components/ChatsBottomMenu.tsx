import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { colors, sizes } from '../constants/sizes';

const ChatsBottomMenu = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
        <View style={styles.menu}>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("SingleChat")}>
                <Icon2 name='message' size={24} color={colors.ACCENT}/>
            </TouchableOpacity>
            <View style={styles.link}>
                <Icon2 name='camera-outline' size={24} color={colors.LIGHT}/>
            </View>
            <View style={styles.link}>
                <Icon name='qr-code-scanner' size={24} color={colors.LIGHT}/>
            </View>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Settings")}>
                <Icon2 name='cog-outline' size={24} color={colors.LIGHT}/>
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
        height: sizes.BIGGEST,
        backgroundColor: 'grey',
        borderRadius: sizes.BIGGEST / 2,
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    link: {
        width: sizes.BIG,
        height: sizes.BIG,
        borderRadius: sizes.BIG / 2,
        borderColor: '#000000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});