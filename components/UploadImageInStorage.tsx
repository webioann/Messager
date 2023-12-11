import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React, { useContext, SetStateAction } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { UserContext } from '../context/UserContext';
import { G } from '../constants/SIZES';

type ImageUploaderProps = {
    getImageURL: React.Dispatch<SetStateAction<string | undefined>>
    children: React.JSX.Element | React.JSX.Element[]
}

const UploadImageInStorage: React.FC<ImageUploaderProps> = ({ getImageURL, children }) => {
    const currentUser = useContext(UserContext)

    const openGalleryAndChooseImage = async() => {
        let fileLocationOnPhone = undefined;
        await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
        .then((file) => { fileLocationOnPhone = Platform.OS === 'ios' ? file.sourceURL : file.path });
        let uniqueName = `send/${currentUser?.uid.slice(0,8)}/at${Date.now().toString()}`
        // put image in Storage and download image URL
        fileLocationOnPhone && await storage().ref(uniqueName).putFile(fileLocationOnPhone)
        let imageURL = await storage().ref(uniqueName).getDownloadURL()
        getImageURL(imageURL)
    }

    return (
        <View style={styles.imagePicker}>
            <TouchableOpacity onPress={openGalleryAndChooseImage}>
                { children }
            </TouchableOpacity>
        </View>
    )
}

export default UploadImageInStorage;
{/* <Icon name='photo' color={color} size={size}/> */}

const styles = StyleSheet.create({
    imagePicker: {
        ...G.row,
        justifyContent: 'flex-start',
        gap: 16
    }

})