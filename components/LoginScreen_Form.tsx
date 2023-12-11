import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native'
import React, { SetStateAction, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ColorSchemeContext } from '../context/ColorSchemeContext';
import {  G } from '../constants/SIZES';

type loginFormProps = {
    email: string
    setEmail: React.Dispatch<SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<SetStateAction<string>>
}

const LoginScreen_Form: React.FC<loginFormProps> = ({email, setEmail, password, setPassword}) => {
    // const [passwordVisibility, setPasswordVisibility] = useState(false)
    // console.log(passwordVisibility)
    const { COLORS } = useContext(ColorSchemeContext)
    return (
        <View style={styles.form}>
            {/* email input */}
            <View style={[styles.inputs, {borderBottomColor: COLORS.tint}]}>
                <Icon name='mail' color={COLORS.tint} size={24}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.color, fontSize: 18}}
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Email'
                    placeholderTextColor={COLORS.tint}
                    cursorColor={COLORS.tint}
                />
                <Icon name='done' color={COLORS.tint} size={24}/>
            </View>
            {/* password input */}
            <View style={[styles.inputs, {borderBottomColor: COLORS.tint}]}>
                <Icon name='lock' color={COLORS.tint} size={24}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.color, fontSize: 18}}
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Password'
                    placeholderTextColor={COLORS.tint}
                    cursorColor={COLORS.tint}
                    secureTextEntry
                />
                <Icon name='visibility-off' color={COLORS.tint} size={24}/>
            </View>
            <TouchableHighlight style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{color: COLORS.blue, fontSize: 16}}>Forgate password ?</Text>
            </TouchableHighlight>
        </View>
    )
}

export default LoginScreen_Form;

const styles = StyleSheet.create({
    form: {
        paddingVertical: 16,
    },
    inputs: {
        ...G.row,
        borderBottomWidth: 1,
        marginVertical: 10
    },
})