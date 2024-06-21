import { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext';

const useChatRoomIDCreator = (contactUID: string) => {
    const [chatRoomID, setChatRoomID] = useState('')
    const { currentUser } = useUserContext()

    const createChatRoomID = () => {
        if(currentUser?.uid) {
            // create a chat room unique ID from two user IDs
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

