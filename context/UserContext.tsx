import React, { useEffect, useState, ReactNode, useContext } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { UserType } from "../Types/users_types";
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
        setAuthStateIsChanged(true)
    }

    // Function to read data from Firestore
    const updateCurrentUser = async (user: FirebaseAuthTypes.User) => {
        try {
            await firestore().collection('USERS_DB').doc(user.uid)
            .onSnapshot(doc => {
                const data = {...doc.data()}
                user && setCurrentUser({
                    // data from Auth
                    photoURL: user?.photoURL,
                    displayName: user?.displayName,
                    email: user?.email ? user.email : 'EMAIL NOT DEFINED',
                    uid: user?.uid, 
                    // data from Firestore DB
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    dateOfBirth: data.dateOfBirth
                })
            })
            setAuthStateIsChanged(false)
        } 
        catch (error) { return error }
    }

    useEffect(() => {
        if(authStateIsChanged) {
            const subscriber = auth().onAuthStateChanged((user) => {
                if(user) { updateCurrentUser(user) }
                else { setCurrentUser(null) }
            });
            return subscriber;
        }
        else return
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

