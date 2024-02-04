import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type wrapperPropsType = {
    onPress: () => void | Promise<void>
    iconName: string
    title: string
}

const WrapperWithLinkAndIcon: React.FC<wrapperPropsType> = ({ onPress, iconName, title }) => {
    const { COLORS } = useColorSchemeContext()

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{flexDirection: 'row', alignItems: 'center', gap: 30, padding: 8}}>
            <Icon name={ iconName } size={24} color={COLORS.color}/>
            <Text style={{color: COLORS.color, fontSize: 18, fontWeight: '700'}}>
                { title }
            </Text>
        </TouchableOpacity>
    )
}

export default WrapperWithLinkAndIcon;

const styles = StyleSheet.create({})