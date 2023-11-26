import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import DefaultUserIcon from './DefaultUserIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { COLORS } from '../constants/SIZES';

type avatarProps = {
    pathToImage?: string;
    size: number;
}

const openGallery = async() => {
    await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
    })
    .then(image => { console.log(image.path) });
}

const UserAvatarWithEdit: React.FC<avatarProps> = ({ pathToImage, size }) => {

    return (
        <View style={styles.avatarContainer}>
            <View style={[styles.avatarContainer, { width: size, height: size, borderRadius: size / 2 }]}>
                { pathToImage 
                    ? <Image 
                        source={{uri: pathToImage}}
                        style={[styles.logo, { borderRadius: size / 2 }]}
                        alt='user avatar'
                        resizeMode='contain'
                    />
                    : <DefaultUserIcon size={size} color={COLORS.GREY}/>
                }
                <Pressable 
                    style={styles.editButton} 
                    onPress={openGallery}
                    >
                    <Icon name='edit' color={'#ffffff'} size={24}/>
                </Pressable>
            </View>

        </View>
    )
}

export default UserAvatarWithEdit;

const styles = StyleSheet.create({

    avatarContainer: {
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',

    },
    editButton: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        borderColor: '#ffffff',
        borderWidth: 1,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.BG
    }
})