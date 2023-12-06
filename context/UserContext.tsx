import React, { createContext, useEffect, useState, ReactNode } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { UserType, currentUserType } from "../Types/users_types";

type childrenType = {
    children: ReactNode[] | ReactNode 
}

export const UserContext = createContext<currentUserType | null>(null);

export const USER_CONTEXT_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);

    // const changeCurrentUserState = (user: FirebaseAuthTypes.User) => {
    //     if(user) {
    //         setCurrentUser({
    //             displayName: user.displayName,
    //             email: user.email,
    //             uid: user.uid,
    //             photoURL: user.photoURL,
    //             phoneNumber: user.phoneNumber
    //         })
    //     }
    //     else { setCurrentUser(null) }
    // }

    // useEffect(() => {
    //     const listener = auth().onAuthStateChanged(() => changeCurrentUserState)
    //     return listener;// unsubscribe on unmount
    // }, [currentUser])

    useEffect(() => {
        if(currentUser) { auth().signOut() }
        else {
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
        // return listener();// unsubscribe on unmount
    }, [])

    // TODO:
    console.log(`AUTH_STATE_CONTEXT_USER --->`, currentUser)
    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};