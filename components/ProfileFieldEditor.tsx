import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';

type editorProps = {
    label: string
    value: string
    setValue: (value: string) => void
    info: string | null
}

const ProfileFieldEditor: React.FC<editorProps> = ({label, value, setValue, info}) => {
    const { COLORS } = useColorSchemeContext()

    return (
        <View style={{paddingVertical: 10}}>
            <Text style={[styles.label, {color: COLORS.color}]}>{label}</Text>
            <TextInput
                style={[styles.edit_input, {borderColor: COLORS.tint}]}
                value={value}
                onChangeText={(value) => setValue(value)}
                placeholder={info ? info : 'phone number not install yet'}
                cursorColor={COLORS.color}
                placeholderTextColor={info ? COLORS.color : COLORS.orange}
            />
        </View>
    )
}

export default ProfileFieldEditor;

const styles = StyleSheet.create({
    edit_input: {
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        paddingBottom: 5
    },

})