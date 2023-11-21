import React, { createContext, useEffect, useState, ReactNode } from "react";
import auth from '@react-native-firebase/auth'
import { CurrentUser_Type } from '../Types/currentUser_types'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

interface IUser {
    name: string | null
    email: string | null
    user_id: string | null
    photoURL: string | null
}
type childrenType = {
    children: ReactNode[] | ReactNode 
}
export const UserContext = createContext({});

export const USER_CONTEXT_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            user && setCurrentUser({...user})
        })
    }, [])

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};