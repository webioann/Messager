import { StyleSheet, Text, View, SafeAreaView, StatusBar, Alert, Button, ImageBackground } from 'react-native';
import React from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/SIZES';
import auth from '@react-native-firebase/auth'

const Settings_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    const signoutCurrentUser = () => {
        auth().signOut()
        .then(() => console.log(auth().currentUser))
        .then(() => Alert.alert('User log out App'))
        .catch(error => console.log(error))
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.BG}/>
            <View>
            <Text style={styles.text}>Settings</Text>
                <Button title='Go to the Chats' onPress={() => navigation.navigate("Chats")}/>
                <Button title='SIGN OUT' onPress={signoutCurrentUser}/>
            </View>
        </SafeAreaView>
    )
    
}
export default Settings_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: COLORS.ACCENT,
        fontSize: 50,
        marginBottom: 50,
    },
});
