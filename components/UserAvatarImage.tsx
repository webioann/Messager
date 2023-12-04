import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { COLORS } from '../constants/SIZES';

type avatarProps = {
    pathToImage?: string | undefined;
    size: number;
}

const UserAvatarImage: React.FC<avatarProps> = ({ pathToImage, size }) => {
    
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
                        tintColor: COLORS.GREY,
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
        // borderColor: COLORS.DARK,
        // borderStyle: 'solid',
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