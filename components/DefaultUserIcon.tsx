import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { IconPropsType } from '../Types/main_types'

const DefaultUserIcon: React.FC<IconPropsType> = ({size, color}) => {
    return (
        <Image 
            source={require('../assets/defaultUserIcon.png')}
            style={{ 
                width: size, 
                height: size, 
                borderRadius: size / 2,
                tintColor: color,
            }}
            alt='default user icon'
            resizeMode='contain'
        />
    )
}

export default DefaultUserIcon;

