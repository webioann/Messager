import React, { useEffect, useState, ReactNode, useContext } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import {  UserType } from "../Types/users_types";
import firestore from '@react-native-firebase/firestore';

type childrenType = {
    children: ReactNode[] | ReactNode 
}

type UserContextType = {
    currentUser: UserType | null
    restartAuthState: () => void
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const USER_CONTEXT_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [authStateIsChanged, setAuthStateIsChanged] = useState(false)

    const restartAuthState = () => {
        setAuthStateIsChanged(prev => !prev)
    }

    const updateCurrentUserState = async(user: FirebaseAuthTypes.User) => {
        user && await firestore().collection('USERS_DB').doc(user.uid).get()
            .then((doc) => {
                const data = doc.data()
                // console.log(data)
                if(data && user) {
                    setCurrentUser({
                        displayName: user.displayName,
                        email: user.email  ? user.email : data.email,
                        uid: user.uid,
                        photoURL: user.photoURL,
                        phoneNumber: data?.phoneNumber,
                        gender: data?.gender,
                        dateOfBirth: data?.dateOfBirth
                    })
                }
                else { setCurrentUser(null) }
        })
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            user && updateCurrentUserState(user)
        });
        return subscriber;
    }, [authStateIsChanged])

    // TODO:
    console.log(`AUTH_STATE_CONTEXT_USER --->`, currentUser)

    return (
        <UserContext.Provider value={{currentUser, restartAuthState}}>
            {children}
        </UserContext.Provider>
    );
};
export function useUserContext() { // <--- custom hook for current user context
    const context = useContext(UserContext)
    if (context === null) {
        throw new Error('useUserContext is broken')
    }
    return context
};