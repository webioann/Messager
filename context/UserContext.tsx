import React, { createContext, useEffect, useState, ReactNode } from "react";
import auth from '@react-native-firebase/auth'

type childrenType = {
    children: ReactNode[] | ReactNode 
}
interface IUser {
    name: string | null
    email: string | null
    uid: string | null
    photoURL: string | null
}

export const UserContext = createContext<IUser | null>(null);

export const USER_CONTEXT_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const onAuthStateChanged = () => {
        const user = auth().currentUser
        if(user) {
            setUser({
                name: user.displayName ? user.displayName : user.email,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL
            })
        }
        else { setUser(null) }
    }

    useEffect(() => {
        auth().onAuthStateChanged(onAuthStateChanged)
    }, [])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};