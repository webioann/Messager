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












// const loginCurrentUser2222 = async() => {
//     const _USER_ = auth().currentUser
//     if(email.length > 4 || password.length > 4){
//         if(_USER_) {
//             await auth().signOut()
//             .then(() => console.log(`You are logged out and _USER_ --> ${auth().currentUser}`))
//             .then(() => Alert.alert('You are logged out'))
//             .catch(error => console.log(`_AUTH_ERROR_ --> ${error}`))
//             if(_USER_ == null) {
//                 await auth().signInWithEmailAndPassword(email, password)
//                 // .then(() => console.log(auth().currentUser))
//                 .then(() => Alert.alert('You are LOGGED IN'))
//                 .catch(error => console.log(`_LOG_IN_AUTH_ERROR_ --> ${error}`))
//             } else return
//         }
//         if(_USER_ == null) {
//             await auth().signInWithEmailAndPassword(email, password)
//             // .then(() => console.log(auth().currentUser))
//             .then(() => Alert.alert('You are LOGGED IN '))
//             .catch(error => console.log(`_LOG_IN_AUTH_ERROR_ --> ${error}`))
//         }
//     } else return null
// }
