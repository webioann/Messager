// TODO: REMOVE THIS
import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';

type phoneNumberInputProps = {
    oldPhone: string

}

const PhoneNumberInput: React.FC<phoneNumberInputProps> = ({ oldPhone }) => {
    const { COLORS } = useColorSchemeContext()

    const [collected, setCollected] = useState({
        countryCode: '+380',
        operatorCode: '00',
        firstThreeNums: '000',
        secondTwoNums: '00',
        lastTwoNums: '00'
    })

    return (
        <View style={styles.rowOfInputs}>
            <Text style={[styles.input, {color: COLORS.color}]}>
                {collected.countryCode}
            </Text>
            <TextInput
                keyboardType='numeric'
                maxLength={2}
                style={styles.input}
                onFocus={() => console.log('FOCUS')}
                value={collected.operatorCode}
                onChangeText={(value) => setCollected({
                    ...collected, 
                    operatorCode: value})
                }
                placeholder={oldPhone !== 'not defined' ? oldPhone : '00'}
                cursorColor={COLORS.color}
                placeholderTextColor={COLORS.color}
            />
            <TextInput
                keyboardType='numeric'
                maxLength={3}
                style={styles.input}
                onFocus={() => console.log('FOCUS')}
                value={collected.firstThreeNums}
                onChangeText={(value) => setCollected({
                    ...collected, 
                    firstThreeNums: value})
                }
                placeholder={oldPhone !== 'not defined' ? oldPhone : '000'}
                cursorColor={COLORS.color}
                placeholderTextColor={COLORS.color}
            />
            <TextInput
                keyboardType='numeric'
                maxLength={2}
                style={styles.input}
                onFocus={() => console.log('FOCUS')}
                value={collected.secondTwoNums}
                onChangeText={(value) => setCollected({
                    ...collected, 
                    secondTwoNums: value})
                }
                placeholder={oldPhone !== 'not defined' ? oldPhone : '00'}
                cursorColor={COLORS.color}
                placeholderTextColor={COLORS.color}
            /> 
            <TextInput
                keyboardType='numeric'
                maxLength={2}
                style={styles.input}
                onFocus={() => console.log('FOCUS')}
                value={collected.lastTwoNums}
                onChangeText={(value) => setCollected({
                    ...collected, 
                    lastTwoNums: value})
                }
                placeholder={oldPhone !== 'not defined' ? oldPhone : '00'}
                cursorColor={COLORS.color}
                placeholderTextColor={COLORS.color}
            /> 
        </View>
    )
}

export default PhoneNumberInput;

const styles = StyleSheet.create({
    rowOfInputs: {
        flexDirection: 'row', 
        alignItems: 'center',
        // borderColor: 'red', 
        // borderWidth: 1
    },
    input: {
        fontSize: 18,
        fontWeight: '600',
        borderColor: 'red', 
        borderWidth: 1,
    },

})