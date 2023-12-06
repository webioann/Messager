import { TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { ColorSchemeContext } from '../context/ColorSchemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ThemeModeToggle = () => {
    const { COLORS, toggleColorScheme, appColorScheme } = useContext(ColorSchemeContext);

    return (
        <TouchableOpacity
            style={{backgroundColor: COLORS.main}}
            onPress={() => toggleColorScheme()}>
            <Icon name={appColorScheme === 'light' ? 'dark-mode' : 'light-mode'} size={18} color={COLORS.orange}/>
        </TouchableOpacity>
    )
}

export default ThemeModeToggle;

