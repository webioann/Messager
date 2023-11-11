import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Button } from 'react-native';
import React from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';

import { main_bg, contrast_bg } from '../constants/global.styles';

const Settings_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#343740'}/>
        <ScrollView>
            <View>
                <Text style={styles.text}>Settings</Text>
            </View>
            <Button
                    title='Go to the Chats'
                    onPress={() => navigation.navigate("Chats")}
                />

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
