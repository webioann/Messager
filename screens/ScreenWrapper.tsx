import { SafeAreaView, StatusBar, View } from 'react-native'
import React from 'react'
import { SIZES, G } from '../constants/SIZES';
import useColorScheme from '../hooks/useColorScheme';

type childrenType = {
    children: JSX.Element | JSX.Element[]
}

const ScreenWrapper: React.FC<childrenType> = ({ children }) => {
    const { COLORS, appColorScheme } = useColorScheme()
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
