import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const UserAvatarImage = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.avatar}>
                <Image 
                    source={{uri: 'https://picsum.photos/80'}}
                    style={[styles.logo,]}
                    alt='user avatar'
                    resizeMode='contain'
                />
            </View>
        </View>
    )
}

export default UserAvatarImage

const styles = StyleSheet.create({
    avatar: {
        // flex:1,
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: '#252934',
        borderWidth: 6,
        borderStyle: 'solid',
        shadowColor: '#ffffff',
        shadowOffset: { width: 6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 6
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
        overflow: 'hidden'
    },
    wrapper: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderColor: 'transparent',
        borderWidth: 1,
        borderStyle: "solid",
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    }
})