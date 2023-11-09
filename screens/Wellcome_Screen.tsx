import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { g_styles } from '../components/global.styles';

const ChatsList_Screen = () => {
    const navigation = useNavigation();

    const goTo = () => {navigation.navigate("Chats")}
    return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#343740'}/>
        <ScrollView>
            <View>
                <Text style={styles.text}>Wellcome</Text>
                <Button 
                    title='Go to Chats List' 
                    onPress={goTo}
                />
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
