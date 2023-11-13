import { StyleSheet, Text, View, TextInput, TouchableHighlight, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, sizes, G } from '../constants/sizes';

const InputForms = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.form}>
            {/* email input */}
            <View style={styles.inputs}>
                <Icon name='mail' color={colors.GREY} size={24}/>
                <TextInput 
                    style={{flex: 1, color: colors.LIGHT, fontSize: 18}}
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Email'
                    placeholderTextColor={colors.GREY}
                    cursorColor={colors.LIGHT}
                />
                <Icon name='done' color={colors.GREY} size={24}/>
            </View>
            {/* password input */}
            <View style={styles.inputs}>
                <Icon name='lock' color={colors.GREY} size={24}/>
                <TextInput 
                    style={{flex: 1, color: colors.LIGHT, fontSize: 18}}
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Password'
                    placeholderTextColor={colors.GREY}
                    cursorColor={colors.LIGHT}
                    secureTextEntry
                />
                <Icon name='visibility-off' color={colors.GREY} size={24}/>
            </View>
            <TouchableHighlight style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{color: colors.BLUE, fontSize: 16}}>Forgate password ?</Text>
            </TouchableHighlight>

        </View>
    )
}

export default InputForms

const styles = StyleSheet.create({
    form: {
        paddingVertical: 16,
    },
    inputs: {
        ...G.row,
        borderBottomColor: colors.GREY,
        borderBottomWidth: 1,
        marginVertical: 10
    },
})