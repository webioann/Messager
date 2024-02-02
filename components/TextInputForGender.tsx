import { StyleSheet, TextInput, View } from 'react-native'
import React, { SetStateAction } from 'react'
import useColorSchemeContext from '../hooks/useColorSchemeContext';
import { GenderType } from '../Types/users_types';

type genderInputType = {
    prevGender: GenderType
    gender: string
    setGender: React.Dispatch<SetStateAction<string>>
}

const TextInputForGender: React.FC<genderInputType> = ({ prevGender, gender, setGender }) => {
    const { COLORS } = useColorSchemeContext()

    const genderFieldValidation = (prevGender: GenderType) => {
        let validGender = prevGender
        // changes were not yet
        if(gender.length < 4 && prevGender === 'not defined') { return }
        // were changes but input is empty
        if(gender.length < 4 && prevGender === 'male') { validGender = 'male' }
        if(gender.length < 4 && prevGender === 'female') { validGender = 'female' }
        // incorrect input value
        if(gender.length > 3 && gender !== 'female' || 'male') { validGender = prevGender }
        // correct input value
        if(gender === 'male') { validGender = 'male' }
        if(gender === 'female') { validGender = 'female' }
        return validGender;
    }

    return (
        <View>
            <TextInput
                style={{borderColor: COLORS.tint, fontSize: 18, fontWeight: '600'}}
                value={gender}
                onChangeText={(value) => setGender(value)}
                placeholder={prevGender}
                cursorColor={COLORS.color}
                placeholderTextColor={COLORS.color}
            />
        </View>
    )
}

export default TextInputForGender

const styles = StyleSheet.create({})