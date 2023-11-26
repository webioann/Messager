import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { IconPropsType } from '../Types/main_types'

const DefaultUserIcon: React.FC<IconPropsType> = ({size, color}) => {
    return (
        <Image 
            source={require('../assets/defaultUserIcon.png')}
            style={[styles.userIcon, { 
                width: size, 
                height: size, 
                borderRadius: size / 2,
                tintColor: color,
                borderColor: color
            }]}
            alt='user avatar'
            resizeMode='contain'
        />
    )
}

export default DefaultUserIcon

const styles = StyleSheet.create({
    userIcon: {
        borderWidth: 2,
    }
})