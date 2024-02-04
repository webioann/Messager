import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { UseNavigation_Type } from '../Types/navigation_types';

export const signOutCurrentUser = async() => {
    const navigation = useNavigation<UseNavigation_Type>();

    auth().signOut()
    .then(() => navigation.navigate('Welcome'))
    .catch(error => console.log(`_AUTH_ERROR_ --> ${error}`))
}

