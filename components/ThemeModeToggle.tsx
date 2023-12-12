import { TouchableOpacity } from 'react-native'
import React from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ThemeModeToggle = () => {
    const { COLORS, toggleColorScheme, appColorScheme } = useColorSchemeContext()
    return (
        <TouchableOpacity
            style={{backgroundColor: COLORS.main}}
            onPress={() => toggleColorScheme()}>
            <Icon name={appColorScheme === 'light' ? 'dark-mode' : 'light-mode'} size={18} color={COLORS.orange}/>
        </TouchableOpacity>
    )
}

export default ThemeModeToggle;

