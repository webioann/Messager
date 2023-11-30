import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React, { useState, SetStateAction } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

import { COLORS, SIZES, G } from '../constants/SIZES';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ImageUploaderProps = {
    getImageURL: React.Dispatch<SetStateAction<string | undefined>>
    color: string
    size: number
    uniqueName: string
}

const UploadImageInStorage: React.FC<ImageUploaderProps> = ({ getImageURL, uniqueName, color, size }) => {

    const openGalleryAndChooseImage = async() => {
        let fileLocationOnPhone = undefined;
        await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
        .then((file) => { fileLocationOnPhone = Platform.OS === 'ios' ? file.sourceURL : file.path });
        // let uniqueAvatarName = `user_avatars/${name}_${newUser.user.uid.slice(0,4)}_avatar`


        // put image in Storage and download image URL
        fileLocationOnPhone && await storage().ref(uniqueName).putFile(fileLocationOnPhone)
        let imageURL = await storage().ref(uniqueName).getDownloadURL()
        getImageURL(imageURL)
    }

    return (
        <View style={styles.imagePicker}>
            <TouchableOpacity onPress={openGalleryAndChooseImage}>
                <Icon name='photo' color={color} size={size}/>
            </TouchableOpacity>
        </View>
    )
}

export default UploadImageInStorage;

const styles = StyleSheet.create({
    imagePicker: {
        ...G.row,
        justifyContent: 'flex-start',
        gap: 16
    }

})