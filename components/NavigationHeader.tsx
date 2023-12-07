import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, ReactNode } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ColorSchemeContext } from '../context/ColorSchemeContext';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';

type NavHeaderProps = {
    children?: ReactNode | ReactNode[]
    title: string
}

const NavigationHeader: React.FC<NavHeaderProps> = ({children, title}) => {
    const navigation = useNavigation<UseNavigation_Type>();
    const { COLORS } = useContext(ColorSchemeContext)

    return (
        <View style={[styles.nav_header, {
            justifyContent: children ? 'space-between' : 'flex-start'
            }]}>
            <TouchableOpacity 
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => navigation.goBack()}>
                <Icon name='chevron-left' color={COLORS.tint} size={34}/>
                <Text style={{fontSize: 18, color: COLORS.tint}}>Back</Text>
            </TouchableOpacity>
            <Text style={[styles.screen_title, {color: COLORS.color}]}>{ title }</Text>
            { children }
        </View>
    )
}

export default NavigationHeader;

const styles = StyleSheet.create({
    nav_header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingBottom: 10
    },
    screen_title: {
        fontSize: 24,
        fontWeight: '500',
        paddingHorizontal: 20
    }
})