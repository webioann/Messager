import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';

type editorProps = {
    label: string
    value: string
    setValue: (value: string) => void
    placeholder: string | null
}

const ProfileFieldEditor: React.FC<editorProps> = ({label, value, setValue, placeholder}) => {
    const { COLORS } = useColorSchemeContext()

    return (
        <View style={[styles.field, {borderBottomColor: COLORS.adorn}]}>
            <Text style={[styles.label, {color: COLORS.adorn}]}>{label}</Text>
            <TextInput
                style={styles.edit_input}
                value={value}
                onChangeText={(value) => setValue(value)}
                placeholder={placeholder ? placeholder : 'phone number not install yet'}
                cursorColor={COLORS.color}
                placeholderTextColor={placeholder ? COLORS.color : COLORS.orange}
            />
        </View>
    )
}

export default ProfileFieldEditor;

const styles = StyleSheet.create({
    field: {
        borderBottomWidth: 2,
        marginVertical: 10
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
    },
    edit_input: {
        fontSize: 20,
        fontWeight: '600',
        // borderWidth: 1,
        // borderRadius: 8,
        // paddingVertical: 5
    },
})