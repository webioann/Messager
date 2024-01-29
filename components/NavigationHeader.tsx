import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { StackNavigatorParams } from '../Types/navigation_types';
import { useNavigation, DrawerActions } from '@react-navigation/native';

type NavHeaderProps = {
    screen: keyof StackNavigatorParams
    children?: React.ReactNode | React.ReactNode[]
    type: 'goBack' | 'drawer'
}

const CustomNavigationHeader: React.FC<NavHeaderProps> = ({ screen, type, children}) => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useColorSchemeContext()

    return (
        <View style={[styles.nav_header, {justifyContent: children ? 'space-between' : 'flex-start'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon 
                    name={ type === 'drawer' ? 'menu' : 'chevron-left'} 
                    color={COLORS.color} 
                    size={28}
                    onPress={() => {
                        if(type === 'drawer') { navigation.dispatch(DrawerActions.openDrawer()) }
                        if(type === 'goBack') { navigation.goBack() }
                    }}
                />
                <Text style={[styles.screen_title, {color: COLORS.color}]}>{ screen }</Text>
            </View>
            <View style={{position: 'absolute', right: 16}}>
                { children }
            </View>
        </View>
    )
}

export default CustomNavigationHeader;

const styles = StyleSheet.create({
    nav_header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
        height: 40,
        marginTop: 10,
        paddingHorizontal: 16,
    },
    screen_title: {
        fontSize: 24,
        paddingLeft: 100,
    },
});