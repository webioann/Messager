import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { SIZES } from '../constants/SIZES';

const Menu = () => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()

    return (
        <View style={styles.bottomSection}>
            <View style={[styles.menu, {backgroundColor: COLORS.minor}]}>
                <View style={[styles.link, {backgroundColor: COLORS.main}]}>
                    <Icon2 name='home-outline' size={30} color={COLORS.tint}/>
                </View>
                <TouchableOpacity 
                    style={[styles.link, {backgroundColor: COLORS.main}]} 
                    onPress={() => navigation.navigate('Profile')}>
                        <Icon2 name='account-circle-outline' size={30} color={COLORS.tint}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.link, {backgroundColor: COLORS.main}]}  
                    onPress={() => navigation.navigate("Contacts")}>
                        <Icon2 name='account-outline' size={30} color={COLORS.tint}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.link, {backgroundColor: COLORS.main}]} 
                    onPress={() => navigation.navigate("Settings")}>
                        <Icon2 name='cog-outline' size={30} color={COLORS.tint}/>
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
        overflow: 'hidden',
    },
    link: {
        width: SIZES.BIG,
        height: SIZES.BIG,
        borderRadius: SIZES.BIG / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});