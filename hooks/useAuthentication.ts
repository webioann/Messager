import { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { CurrentUser_Type } from '../Types/currentUser_types'

interface IUser {
    name: string | null
    email: string | null
    user_id: string | null
    photoURL: string | null
}

const useAuthentication = () => {
    const [user, setUser] = useState<IUser | null>(null);

    const onAuthStateChanged = () => {
        const user = auth().currentUser
        if(user) {
            setUser({
                name: user.displayName ? user.displayName : user.email,
                email: user.email,
                user_id: user.uid,
                photoURL: user.photoURL
            })
        }
        else { setUser(null) }
    }

    useEffect(() => {
        auth().onAuthStateChanged(onAuthStateChanged)
    }, [])

    return user
}
export default useAuthentication;

