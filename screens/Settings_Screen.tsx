import { StyleSheet, Text, View, SafeAreaView, StatusBar, Alert, Button, ImageBackground } from 'react-native';
import React from 'react';
import { UseNavigation_Type } from '../Types/navigation_types';
import { useNavigation } from '@react-navigation/native';
import { colors, sizes } from '../constants/sizes';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

const Settings_Screen = () => {
    const navigation = useNavigation<UseNavigation_Type>();

    const createUser = () => {
        auth().createUserWithEmailAndPassword('testUser@gmail.com', '12345top')
        .then(() => Alert.alert('User is created'))
        .catch(error => console.log(error))
    }

    const addDataInFirestore = async () => {
        await firestore().collection('newUser').add({
            name: 'John Doe',
            age: 38,
            car: 'BMW'
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.BG}/>
            <View>
            <Text style={styles.text}>Settings</Text>
                <Button title='Go to the Chats' onPress={() => navigation.navigate("Chats")}/>
            </View>
            <View style={{marginTop: 20}}>
                <Button title='Create new User' onPress={createUser}/>
            </View>

            <View style={{marginTop: 20}}>
                <Button title='ADD new User' onPress={addDataInFirestore}/>
            </View>

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
        marginBottom: 50,
    },
});
