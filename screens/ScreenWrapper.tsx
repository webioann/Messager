import { SafeAreaView, StatusBar, View } from 'react-native'
import React, { useContext } from 'react'
import { SIZES } from '../constants/SIZES';
import { ColorSchemeContext } from '../context/ColorSchemeContext';

type childrenType = {
    children: JSX.Element | JSX.Element[]
}

const ScreenWrapper: React.FC<childrenType> = ({ children }) => {
    const { COLORS, appColorScheme } = useContext(ColorSchemeContext)

    return (
        <SafeAreaView style={{backgroundColor: COLORS.BG_MAIN, flex: 1}}>
            <StatusBar 
                backgroundColor={COLORS.BG_MAIN} 
                barStyle={ appColorScheme === 'dark' ? 'light-content' : 'dark-content'}/>
            <View style={{backgroundColor: COLORS.BG_MAIN, paddingHorizontal: SIZES.GAP}}>
                { children }
            </View>
        </SafeAreaView>
    )
}

export default ScreenWrapper;
