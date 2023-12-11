import { StyleSheet, View, TextInput } from 'react-native'
import React, { SetStateAction } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, G } from '../constants/SIZES';

type signupFormProps = {
    name: string
    setName: React.Dispatch<SetStateAction<string>>
    email: string
    setEmail: React.Dispatch<SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<SetStateAction<string>>
}

const SignupScreen_Form: React.FC<signupFormProps> = ({name, setName, email, setEmail, password, setPassword}) => {

    return (
        <View style={styles.form}>
            {/*  */}
            <View style={styles.inputs}>
                <Icon name='person' size={24} color={COLORS.GREY}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.LIGHT, fontSize: 18}}
                    onChangeText={setName}
                    value={name}
                    placeholder='Name...'
                    placeholderTextColor={COLORS.GREY}
                    cursorColor={COLORS.LIGHT}
                />
                <Icon name='done' size={24} color={COLORS.GREY}/>
            </View>
            {/* email input */}
            <View style={styles.inputs}>
                <Icon name='mail' size={24} color={COLORS.GREY}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.LIGHT, fontSize: 18}}
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Email'
                    placeholderTextColor={COLORS.GREY}
                    cursorColor={COLORS.LIGHT}
                />
                <Icon name='done' size={24} color={COLORS.GREY}/>
            </View>
            {/* password input */}
            <View style={styles.inputs}>
                <Icon name='lock' size={24} color={COLORS.GREY}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.LIGHT, fontSize: 18}}
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Password'
                    placeholderTextColor={COLORS.GREY}
                    cursorColor={COLORS.LIGHT}
                    secureTextEntry
                />
                <Icon name='visibility-off' size={24} color={COLORS.GREY}/>
            </View>
        </View>
    )
}

export default SignupScreen_Form;

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