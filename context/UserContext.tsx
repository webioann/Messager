import React, { useEffect, useState, ReactNode, useContext } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { unitedUserType, personalUserDataType } from "../Types/users_types";
import firestore from '@react-native-firebase/firestore';

type childrenType = {
    children: ReactNode[] | ReactNode 
}

type UserContextType = {
    currentUser: unitedUserType | null
    restartAuthState: () => void
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const USER_CONTEXT_PROVIDER: React.FC<childrenType> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<unitedUserType | null>(null);
    const [authStateIsChanged, setAuthStateIsChanged] = useState(false)

    const restartAuthState = () => {
        setAuthStateIsChanged(prev => !prev)
    }

    const updateCurrentUserState = async(user: FirebaseAuthTypes.User) => {
        if(user) {
            await firestore().collection('USERS_DB').doc(user.uid).get()
            .then((doc) => console.log(doc.data()))

            // .onSnapshot(documentSnapshot => {
            //     setCurrentUser({
            //         displayName: user.displayName,
            //         email: user.email,
            //         uid: user.uid,
            //         photoURL: user.photoURL,
            //         phoneNumber: user.phoneNumber,
            //         gender: documentSnapshot.data,
            //         dateOfBirth: currentUser?.dateOfBirth ? currentUser.dateOfBirth : 'not defined'
            //     })

            //     console.log('User data: ', documentSnapshot.data());
            // });
            // let auth_email = user.email;
            // let auth_uid = user.uid;
            // let auth_displayName = user.displayName;

        }
        else return
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            if(user?.email) {
                updateCurrentUserState(user)
                setCurrentUser({
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,

                    gender: 'not defined',
                    dateOfBirth: 'not defined'
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