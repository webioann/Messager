import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import { COLORS, SIZES, G } from '../constants/SIZES';

const Menu = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
        <View style={styles.bottomSection}>
            <View style={styles.menu}>
                <TouchableOpacity 
                    style={styles.link} 
                    onPress={() => console.log('GO on ---->')}>
                    <Icon2 name='message' size={24} color={COLORS.ACCENT}/>
                </TouchableOpacity>
                <View style={styles.link}>
                    <Icon2 name='camera-outline' size={24} color={COLORS.LIGHT}/>
                </View>
                <TouchableOpacity style={styles.link}  onPress={() => navigation.navigate("Contacts")}>
                    <Icon name='person' size={28} color={COLORS.LIGHT}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Settings")}>
                    <Icon2 name='cog-outline' size={24} color={COLORS.LIGHT}/>
                </TouchableOpacity>
            </View>
        </View>
    )
};
export default Menu;

const styles = StyleSheet.create({
    menu:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: SIZES.BIGGEST,
        backgroundColor: 'grey',
        borderRadius: SIZES.BIGGEST / 2,
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    link: {
        width: SIZES.BIG,
        height: SIZES.BIG,
        borderRadius: SIZES.BIG / 2,
        borderColor: '#000000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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