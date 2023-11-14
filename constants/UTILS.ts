// SIGNOUT function =======================
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

const signoutCurrentUser = () => {
    auth().signOut()
    .then(() => console.log(`You are logged out and _USER_ --> ${auth().currentUser}`))
    .then(() => Alert.alert('You are logged out'))
    .catch(error => console.log(`_AUTH_ERROR_ --> ${error}`))
}
// ====================================================

