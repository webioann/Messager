import { useEffect, useState } from 'react'
import { messageType } from '../Types/chats_types';
import firestore from '@react-native-firebase/firestore';

type groupedMessagesType = {
    sectionTittle: string
    groupedMessages: messageType[]
}

const useFetchMessages = (chatRoomID: string) => {
    const [ messages, setMessages ] = useState<messageType[]>([] as messageType[])
    const [ lastMessage, setLastMessage ] = useState<messageType>({} as messageType)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState<string | null>(null)
    const [lastTimeStamp, setLastTimeStamp] = useState<string | null>(null)
    const [messagesGroup, setMessagesGroup] = useState<groupedMessagesType[]>([] as groupedMessagesType[])

    const createLastMessageTimeStamp = (time: number) => {
        const hoursInTimeStamp = new Date(time).getHours()
        const dayInTimeStamp = new Date(time).getDay()
        let minutes = new Date(time).getMinutes();
        // time right now
        const currentDate = Date.now()
        const dayNow = new Date(currentDate).getDay()
        // difference between stamps in hours
        const howManyDaysAgoSent = dayNow - dayInTimeStamp
        if(howManyDaysAgoSent === 0) {
            minutes < 10
                ? setLastTimeStamp(`${hoursInTimeStamp + 1}:0${minutes +1}`) 
                : setLastTimeStamp(`${hoursInTimeStamp + 1}:${minutes +1}`)
        }
        if(howManyDaysAgoSent === 1) {
            setLastTimeStamp('yestrday')
        }
        if(howManyDaysAgoSent === 2) {
            setLastTimeStamp('two days ago')
        }
        if(howManyDaysAgoSent === 3) {
            setLastTimeStamp('three days ago')
        }
        if(howManyDaysAgoSent > 3) {
            let date =  new Date(time).getDate()
            let monthIndex =  new Date(time).getMonth()
            let monthsList = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
            setLastTimeStamp(`${monthsList[monthIndex]}. ${date}`)
        }
    }

    // const groupMessagesByDate = (messagesArray: messageType[]) => {
    //     let arrayOfDates: string[] = []
    //     messagesArray.map((item) => {
    //         let creatingDate = new Date(item.createdAt).toLocaleDateString("en-GB")
    //         arrayOfDates.push(creatingDate)
    //     })
    //     let uniqueDates = new Set(arrayOfDates)
    //     if(uniqueDates) {
    //         let oneGroup = messagesArray.filter((item, index) => {
    //             let creatingDate = new Date(item.createdAt).toLocaleDateString("en-GB")
    //             if(uniqueDates.has(creatingDate)) {
    //                 console.log('HEY')
    //             }
    //         })
    //         console.log(oneGroup)
    //     }
    // }
    // const groupMessagesByDate = (messagesArray: messageType[]) => {
    //     let raw: groupedMessagesType[] = [] as groupedMessagesType[]
    //     messagesArray.map((item) => {
    //         let creatingDate = new Date(item.createdAt).toLocaleDateString("en-GB")
    //         let temp: groupedMessagesType = {
    //             sectionTittle: creatingDate,
    //             groupedMessages: [item]
    //         }
    //         raw.push(temp)
    //     })
    //     setMessagesGroup([...new Set(raw)])
    // }

    const fetchMessagesList = async() => {
        setIsLoading(true)
        try{
            await firestore().collection('CHAT_ROOM_DB').doc(chatRoomID)
            .onSnapshot((response) => {
                let raw = response.data()
                if(raw) {
                    setMessages(raw.messages)
                    // groupMessagesByDate(raw.messages)
                    let lastIndex = raw.messages.length - 1
                    setLastMessage(raw.messages[lastIndex])
                    if(raw.messages[lastIndex]) {
                        let time = raw.messages[lastIndex].createdAt
                        createLastMessageTimeStamp(time)
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
    }, [chatRoomID])

    const reFetch = () => {
        setIsLoading(true)
        fetchMessagesList();
    }

    return { messages, isLoading, isError, reFetch, lastMessage, lastTimeStamp, messagesGroup }
}

export default useFetchMessages;

