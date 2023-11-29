import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext';

const useChatRoomIDCreator = (contactUID: string) => {
    const currentUser = useContext(UserContext)
    const [chatRoomID, setChatRoomID] = useState('')

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
        console.log(`chatRoomID ---> ${chatRoomID}`)
    }, [contactUID])

    return chatRoomID
}

export default useChatRoomIDCreator;

