import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import useColorSchemeContext from '../hooks/useColorSchemeContext';

type signupFormProps = {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
}

const SignupScreen_Form: React.FC<signupFormProps> = ({name, setName, email, setEmail, password, setPassword}) => {
    const { COLORS } = useColorSchemeContext()

    return (
        <View style={styles.form}>
            {/* user name input */}
            <View style={[styles.inputs, {borderBottomColor: COLORS.tint}]}>
                <Icon name='person' size={24} color={COLORS.tint}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.color, fontSize: 18}}
                    onChangeText={setName}
                    value={name}
                    placeholder='Name...'
                    placeholderTextColor={COLORS.tint}
                    cursorColor={COLORS.color}
                />
                <Icon name='done' size={24} color={COLORS.tint}/>
            </View>
            {/* email input */}
            <View style={[styles.inputs, {borderBottomColor: COLORS.tint}]}>
                <Icon name='mail' size={24} color={COLORS.tint}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.color, fontSize: 18}}
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Email'
                    placeholderTextColor={COLORS.tint}
                    cursorColor={COLORS.color}
                />
                <Icon name='done' size={24} color={COLORS.tint}/>
            </View>
            {/* password input */}
            <View style={[styles.inputs, {borderBottomColor: COLORS.tint}]}>
                <Icon name='lock' size={24} color={COLORS.tint}/>
                <TextInput 
                    style={{flex: 1, color: COLORS.color, fontSize: 18}}
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Password'
                    placeholderTextColor={COLORS.tint}
                    cursorColor={COLORS.color}
                    secureTextEntry
                />
                <Icon name='visibility-off' size={24} color={COLORS.tint}/>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginVertical: 10
    },
});