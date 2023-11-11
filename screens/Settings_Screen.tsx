import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import { main_bg, contrast_bg } from '../constants/global.styles';

const Settings_Screen = () => {

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#343740'}/>
        <ScrollView>
            <View>
                <Text style={styles.text}>Settings</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}
export default Settings_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: main_bg,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: contrast_bg,
        fontSize: 50,
    }
});
