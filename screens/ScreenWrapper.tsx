import { SafeAreaView, StatusBar, View } from 'react-native';
import React from 'react';
import useColorSchemeContext from '../hooks/useColorSchemeContext';

type childrenType = {
    children: JSX.Element | JSX.Element[]
}

const ScreenWrapper: React.FC<childrenType> = ({ children }) => {
    const { COLORS, appColorScheme } = useColorSchemeContext()
    
    return (
        <SafeAreaView style={{backgroundColor: COLORS.main, flex: 1}}>
            <StatusBar 
                backgroundColor={COLORS.main} 
                barStyle={ appColorScheme === 'dark' ? 'light-content' : 'dark-content'}/>
            <View style={{backgroundColor: COLORS.main, position: 'relative',flex: 1}}>
                { children }
            </View>
        </SafeAreaView>
    )
}

export default ScreenWrapper;
