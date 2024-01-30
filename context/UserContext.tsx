import React, { useEffect, useState, ReactNode, useContext } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import {  currentUserType } from "../Types/users_types";
import firestore from '@react-native-firebase/firestore';

type childrenType = {
    children: ReactNode[] | ReactNode 
}

type UserContextType = {
    currentUser: currentUserType | null
    restartAuthState: () => void
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const USER_CONTEXT_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);
    const [authStateIsChanged, setAuthStateIsChanged] = useState(false)

    const restartAuthState = () => {
        setAuthStateIsChanged(prev => !prev)
    }

    // Function to read data from Firestore
    const readDataFromFirestore = async (docId: string) => {
        try {
            const ref = firestore().collection('USERS_DB').doc(docId)
            const response = await ref.get()
            return response
        } catch (error) {
        return error
        }
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            let dbUserData ;
            if(user && user.email) {
                setCurrentUser({
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                })
            }
            else { setCurrentUser(null) }
        });
        return subscriber;
    }, [authStateIsChanged])

    // TODO:
    // console.log(`AUTH_STATE_CONTEXT_USER --->`, currentUser)

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

    // const updateCurrentUserState = async(user: FirebaseAuthTypes.User) => {
    //     user && await firestore().collection('USERS_DB').doc(user.uid).get()
    //         .then((doc) => {
    //             const data = doc.data()
    //             // console.log(data)
    //             if(data && user) {
    //                 setCurrentUser({
    //                     displayName: user.displayName,
    //                     email: user.email  ? user.email : data.email,
    //                     uid: user.uid,
    //                     photoURL: user.photoURL,
    //                     phoneNumber: data?.phoneNumber,
    //                     gender: data?.gender,
    //                     dateOfBirth: data?.dateOfBirth
    //                 })
    //             }
    //             else { setCurrentUser(null) }
    //     })
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged((user) => {
    //         user && updateCurrentUserState(user)
    //         if(user?.uid) {
    //             const response = readDataFromFirestore(user?.uid)
    //             console.log('RESPONSE', response)
    //         }
    //     });
    //     return subscriber;
    // }, [authStateIsChanged])

