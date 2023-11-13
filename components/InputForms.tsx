import { StyleSheet, Text, View, TextInput, TouchableHighlight, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES, G } from '../constants/SIZES';

const InputForms = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.form}>
            {/* email input */}
            <View style={styles.inputs}>
                <Icon name='mail' color={COLORS.GREY} size={24}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.LIGHT, fontSize: 18}}
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Email'
                    placeholderTextColor={COLORS.GREY}
                    cursorColor={COLORS.LIGHT}
                />
                <Icon name='done' color={COLORS.GREY} size={24}/>
            </View>
            {/* password input */}
            <View style={styles.inputs}>
                <Icon name='lock' color={COLORS.GREY} size={24}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.LIGHT, fontSize: 18}}
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Password'
                    placeholderTextColor={COLORS.GREY}
                    cursorColor={COLORS.LIGHT}
                    secureTextEntry
                />
                <Icon name='visibility-off' color={COLORS.GREY} size={24}/>
            </View>
            <TouchableHighlight style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{color: COLORS.BLUE, fontSize: 16}}>Forgate password ?</Text>
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
        borderBottomColor: COLORS.GREY,
        borderBottomWidth: 1,
        marginVertical: 10
    },
})