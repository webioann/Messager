import React, { createContext, useEffect, useState, ReactNode } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType, currentUserType } from "../Types/users_types";

type childrenType = {
    children: ReactNode[] | ReactNode 
}

export const UserContext = createContext<currentUserType | null>(null);

export const USER_CONTEXT_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);

    const changeCurrentUserState = () => {
        auth().onAuthStateChanged((user) => {
            if(user) {
                setCurrentUser({
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber
                })
            }
            else { setCurrentUser(null) }
        })
    }

    useEffect(() => {
        changeCurrentUserState();
    }, [])

    const storeCurrentUser = async (value: currentUserType) => {
        try {
            await AsyncStorage.setItem('CURRENT_USER', JSON.stringify(value));
            console.log(value)
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        currentUser && storeCurrentUser(currentUser)
    }, [currentUser])

    // TODO:
    console.log(`AUTH_STATE_CONTEXT_USER --->`, currentUser)
    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};