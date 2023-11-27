import React, { createContext, useEffect, useState, ReactNode } from "react";
import auth from '@react-native-firebase/auth'

type childrenType = {
    children: ReactNode[] | ReactNode 
}
interface IUser {
    displayName: string | null
    email: string | null
    uid: string | null
    photoURL: string | null
    phoneNumber: string | null
}

export const UserContext = createContext<IUser | null>(null);

export const USER_CONTEXT_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    const onAuthStateChanged = () => {
        const user = auth().currentUser
        if(user) {
            setCurrentUser({
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
                phoneNumber: null
            })
        }
        else { setCurrentUser(null) }
    }

    useEffect(() => {
        auth().onAuthStateChanged(onAuthStateChanged)
    }, [auth])

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};