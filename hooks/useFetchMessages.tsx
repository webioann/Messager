import React, { useEffect, useState } from 'react'
import { messageType, ChatRoomType } from '../Types/chats_types';
import firestore from '@react-native-firebase/firestore';

const useFetchMessages = (room: string) => {
    const [ messages, setMessages ] = useState<messageType[]>([] as messageType[])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState<string | null>(null)

    const fetchMessagesList = async() => {
        setIsLoading(true)
        try{
            await firestore().collection('CHAT_ROOM_DB').doc(room)
            .onSnapshot((response) => {
                let raw = response.data()
                raw && setMessages(raw.messages)
            })
            setIsLoading(false)
        }
        catch (error) { 
            error instanceof Error 
                ? setIsError(error.message) 
                : setIsError(`Unexpected error ${error}`)
        }
        finally { setIsLoading(false) }
    }

    useEffect(() => {
        fetchMessagesList()
    }, [])

    const reFetch = () => {
        setIsLoading(true)
        fetchMessagesList();
    }

    return { messages, isLoading, isError, reFetch }
}

export default useFetchMessages;

