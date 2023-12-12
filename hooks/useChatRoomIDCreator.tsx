import { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext';

const useChatRoomIDCreator = (contactUID: string) => {
    const [chatRoomID, setChatRoomID] = useState('')
    const { currentUser } = useUserContext()

    const createChatRoomID = () => {
        if(currentUser?.uid) {
            // set CHAT ROOM unique ID
            if( contactUID > currentUser.uid ) {
                setChatRoomID(contactUID.slice(0,8).concat('_@_', currentUser.uid.slice(0,8)))
            }
            if( currentUser.uid > contactUID ) {
                setChatRoomID(currentUser.uid.slice(0,8).concat('_@_', contactUID.slice(0,8)))
            }
        }
    }

    useEffect(() => { 
        createChatRoomID(); 
    }, [contactUID])

    return chatRoomID
}

export default useChatRoomIDCreator;

