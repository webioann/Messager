import { StyleSheet, Platform, View, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import DefaultUserIcon from './DefaultUserIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { COLORS } from '../constants/SIZES';

import storage from '@react-native-firebase/storage';

type avatarProps = {
    pathToImage?: string;
    size: number;
}


const UserAvatarWithEdit: React.FC<avatarProps> = ({ pathToImage, size }) => {

    const [filePath, setFilePath] = useState<string | undefined>(undefined)
    const [url, setURL] = useState('')
    const [ava, setAva] = useState<string | null>(null)

    const openGalleryAndChoosePhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
        .then((file) => { setFilePath(Platform.OS === 'ios' ? file.sourceURL : file.path) });
    }

    const changeAvatar = async() => {
        if(filePath) {
            try{
                await storage().ref(`Pedro_avatar`).putFile(filePath)
                let imageURL = await storage().ref(`Pedro_avatar`).getDownloadURL()
                setFilePath(undefined)
                setURL(imageURL)
            }
            catch(error) { console.log(error) }
        }
        else return
    }

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
                    onPress={openGalleryAndChoosePhoto}
                    >
                    <Icon name='edit' color={'#ffffff'} size={24}/>
                </Pressable>
            </View>
            <Pressable onPress={changeAvatar}>
                <Icon name='star' color={'#ffffff'} size={24}/>    
            </Pressable>
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