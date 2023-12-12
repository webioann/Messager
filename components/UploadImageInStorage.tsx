import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useUserContext } from '../context/UserContext';

type ImageUploaderProps = {
    getImageURL: React.Dispatch<React.SetStateAction<string | undefined>>
    children: React.JSX.Element | React.JSX.Element[]
    storageFolder: 'avatars' | 'messages' | 'images'
}

const UploadImageInStorage: React.FC<ImageUploaderProps> = ({ getImageURL, children, storageFolder }) => {
    const { currentUser } = useUserContext()

    const openGalleryAndChooseImage = async() => {
        let fileLocationOnPhone = undefined;
        await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
        .then((file) => { fileLocationOnPhone = Platform.OS === 'ios' ? file.sourceURL : file.path });
        let uniqueName = `${storageFolder}/${currentUser?.uid}/${Date.now().toString()}`;
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

const styles = StyleSheet.create({
    imagePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 16
    }
});