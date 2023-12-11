import React, { createContext, useEffect, useState, ReactNode, SetStateAction } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { currentUserType } from "../Types/users_types";

type childrenType = {
    children: ReactNode[] | ReactNode 
}

// type UserContextType = {
//     currentUser: currentUserType | null
//     restartAuthState: () => void
// }

export const UserContext = createContext<currentUserType | null>(null);

export const USER_CONTEXT_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);
    // const [authStateIsChanged, setAuthStateIsChanged] = useState(false)

    // const restartAuthState = () => {
    //     setAuthStateIsChanged(prev => !prev)
    // }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
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
    
        });
        return subscriber;
    }, [])

    // TODO:
    console.log(`AUTH_STATE_CONTEXT_USER --->`, currentUser)
    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};