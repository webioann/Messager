import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Button } from 'react-native';
import React from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { colors, sizes } from '../constants/sizes';

const Settings_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.BG}/>
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
        backgroundColor: colors.BG,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colors.ACCENT,
        fontSize: 50,
    }
});
