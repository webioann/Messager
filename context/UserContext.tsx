import React, { useEffect, useState, ReactNode, useContext } from "react";
import auth from '@react-native-firebase/auth'
import { currentUserType } from "../Types/users_types";

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