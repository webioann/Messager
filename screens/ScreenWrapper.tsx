import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, G } from '../constants/SIZES';
import useColorScheme from '../hooks/useColorScheme';

type childrenType = {
    children: JSX.Element | JSX.Element[]
}

const ScreenWrapper: React.FC<childrenType> = ({ children }) => {
    const { COLORS } = useColorScheme()
    return (
        <SafeAreaView style={styles.area}>
            <StatusBar backgroundColor={COLORS.BG_MAIN} barStyle={'dark-content'}/>
            <View style={styles.wrapper}>
                { children }
            </View>
        </SafeAreaView>
    )
}

export default ScreenWrapper;

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapper: {
        backgroundColor: 'white',
        paddingHorizontal: SIZES.GAP,
    }
})