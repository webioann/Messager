import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type wrapperPropsType = {
    onPress: () => void | Promise<void>
    iconName: string
    title: string
    color?: string
}

const WrapperWithLinkAndIcon: React.FC<wrapperPropsType> = ({ onPress, iconName, title, color }) => {
    // this component use in Setting screen
    const { COLORS } = useColorSchemeContext()

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.row, {borderBottomColor: COLORS.adorn}]}>
            <Icon name={ iconName } size={24} color={color ? color : COLORS.color}/>
            <Text style={[styles.title, {color : COLORS.color}]}>
                { title }
            </Text>
        </TouchableOpacity>
    )
}

export default WrapperWithLinkAndIcon;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 30, 
        padding: 8,
        borderBottomWidth: 1,

    },
    title: {
        fontSize: 18, 
        fontWeight: '700',
    }
})