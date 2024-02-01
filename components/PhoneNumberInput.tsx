import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useUserContext } from '../context/UserContext';
import useColorSchemeContext from '../hooks/useColorSchemeContext';

type phoneNumberInputProps = {
    oldPhone: string

}

const PhoneNumberInput: React.FC<phoneNumberInputProps> = ({ oldPhone }) => {
    const { currentUser, restartAuthState } = useUserContext()
    const { COLORS } = useColorSchemeContext()

    const [collected, setCollected] = useState({
        countryCode: '+380',
        operatorCode: '(000)',
        firstThreeNums: '000',
        secondTwoNums: '00',
        lastTwoNums: '00'
    })

    return (
        <View style={{flexDirection: 'row', borderColor: 'red', borderWidth: 1}}>
            <TextInput
                keyboardType='numeric'
                maxLength={9}
                style={styles.edit_input}
                onFocus={() => console.log('FOCUS')}
                value={collected.countryCode}
                onChangeText={(value) => setCollected({ ...collected,countryCode: value})}
                placeholder={oldPhone !== 'not defined' ? oldPhone : '+38 (000)'}
                cursorColor={COLORS.color}
                placeholderTextColor={COLORS.color}
            />
            <TextInput
                keyboardType='numeric'
                maxLength={3}
                style={styles.edit_input}
                onFocus={() => console.log('FOCUS')}
                value={collected.operatorCode}
                onChangeText={(value) => setCollected({ ...collected, operatorCode: value})}
                placeholder={oldPhone !== 'not defined' ? oldPhone : ' 000'}
                cursorColor={COLORS.color}
                placeholderTextColor={COLORS.color}
            />
            {/* <TextInput
                keyboardType='numeric'
                maxLength={2}
                style={styles.edit_input}
                onFocus={() => console.log('FOCUS')}
                value={phone}
                onChangeText={(value) => setPhone(value)}
                placeholder={oldPhone !== 'not defined' ? oldPhone : ' 00'}
                cursorColor={COLORS.color}
                placeholderTextColor={COLORS.color}
            />
            <TextInput
                keyboardType='numeric'
                maxLength={2}
                style={styles.edit_input}
                onFocus={() => console.log('FOCUS')}
                value={phone}
                onChangeText={(value) => setPhone(value)}
                placeholder={oldPhone !== 'not defined' ? oldPhone : ' 00'}
                cursorColor={COLORS.color}
                placeholderTextColor={COLORS.color}
            /> */}
        </View>
    )
}

export default PhoneNumberInput;

const styles = StyleSheet.create({
    edit_input: {
        fontSize: 18,
        fontWeight: '600',
    },

})