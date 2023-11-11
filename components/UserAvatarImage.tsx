import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { dark_bg } from '../constants/global.styles';

type avatarProps = {
    pathToImage: string;
    size: number;
}

const UserAvatarImage: React.FC<avatarProps> = ({ pathToImage, size }) => {
    const defaultPath = 'https://picsum.photos/100'
    
    return (
        <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, borderWidth: size / 12, }]}>
            <Image 
                source={{uri: pathToImage ? pathToImage : defaultPath}}
                style={[styles.logo, { borderRadius: size / 2 }]}
                alt='user avatar'
                resizeMode='contain'
            />
        </View>
    )
}
export default UserAvatarImage;

const styles = StyleSheet.create({
    avatar: {
        borderColor: dark_bg,
        borderStyle: 'solid',
        overflow: 'hidden'
    },
    logo: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
});