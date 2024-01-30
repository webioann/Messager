import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import useColorSchemeContext from '../hooks/useColorSchemeContext';

type avatarProps = {
    pathToImage?: string | null;
    size: number;
}

const UserAvatarImage: React.FC<avatarProps> = ({ pathToImage, size }) => {
    const { COLORS } = useColorSchemeContext()

    return (
        <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
            { pathToImage 
                ? <Image 
                        source={{uri: pathToImage}}
                        style={[styles.logo, { borderRadius: size / 2 }]}
                        alt='user avatar'
                        resizeMode='contain'
                    />
                : <Image 
                    source={require('../assets/defaultUserIcon.png')}
                    style={{ 
                        width: size, 
                        height: size, 
                        borderRadius: size / 2,
                        tintColor: COLORS.tint,
                    }}
                    alt='default user icon'
                    resizeMode='contain'
                />
                }
        </View>
    )
}
export default UserAvatarImage;

const styles = StyleSheet.create({
    avatar: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
});