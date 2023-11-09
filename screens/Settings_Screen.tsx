import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import { g_styles } from '../components/global.styles';

const ChatsList_Screen = () => {
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

export default ChatsList_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: g_styles.app_bg,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: g_styles.contrast_bg,
        fontSize: 50,
    }
});
