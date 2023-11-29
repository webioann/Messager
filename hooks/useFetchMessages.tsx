import React, { useEffect, useState } from 'react'
import { messageType, ChatRoomType } from '../Types/chats_types';
import firestore from '@react-native-firebase/firestore';

const useFetchMessages = (room: string) => {
    const [ messages, setMessages ] = useState<messageType[]>([] as messageType[])
    const [ lastMessage, setLastMessage ] = useState<messageType>({} as messageType)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState<string | null>(null)
    const [lastTimeStamp, setLastTimeStamp] = useState<string | null>(null)

    const fetchMessagesList = async() => {
        setIsLoading(true)
        try{
            await firestore().collection('CHAT_ROOM_DB').doc(room)
            .onSnapshot((response) => {
                let raw = response.data()
                if(raw) {
                    setMessages(raw.messages)
                    let lastIndex = raw.messages.length - 1
                    setLastMessage(raw.messages[lastIndex])
                    if(raw.messages[lastIndex]) {
                        let time = raw.messages[lastIndex].createdAt
                        const dateObject = new Date(time)
                        let hours = dateObject.getHours();
                        let minutes = dateObject.getMinutes();
                        minutes < 10
                            ? setLastTimeStamp(`${hours + 1}:0${minutes +1}`) 
                            : setLastTimeStamp(`${hours + 1}:${minutes +1}`)
                    }
                }
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
    }, [room])

    const reFetch = () => {
        setIsLoading(true)
        fetchMessagesList();
    }

    return { messages, isLoading, isError, reFetch, lastMessage, lastTimeStamp }
}

export default useFetchMessages;

