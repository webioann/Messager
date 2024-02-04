import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';
const { currentUser, restartAuthState } = useUserContext()
import { useUserContext } from '../context/UserContext';

export const signOutCurrentUser = async() => {
    const navigation = useNavigation<UseNavigation_Type>();

    const signOutWithAlert = () => {
        Alert.alert('WARNING', 'Do you really want logout?', [
            { text: 'YES', onPress : () => {
                auth().signOut()
                .then(() => restartAuthState())
                .then(() => navigation.navigate('Welcome'))
                .catch(error => console.log(`_AUTH_SIGN_OUT_ERROR_ --> ${error}`))
            }},
            { text: 'NOT', onPress : () => {return}, style: 'cancel'},
        ])
    }
}

