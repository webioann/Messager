import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React, { useState, SetStateAction } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { COLORS, SIZES, G } from '../constants/SIZES';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ImageUploaderProps = {
    setFilePath: React.Dispatch<SetStateAction<string | undefined>>
    color: string
    size: number
}

const ImageUploader: React.FC<ImageUploaderProps> = ({setFilePath, color, size}) => {

    const openGalleryAndChooseImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
        .then((file) => { setFilePath(Platform.OS === 'ios' ? file.sourceURL : file.path) });
    }

    return (
        <View style={styles.imagePicker}>
            <TouchableOpacity onPress={openGalleryAndChooseImage}>
                <Icon name='photo' color={color} size={size}/>
            </TouchableOpacity>
        </View>
    )
}

export default ImageUploader;

const styles = StyleSheet.create({
    imagePicker: {
        ...G.row,
        justifyContent: 'flex-start',
        gap: 16
    }

})