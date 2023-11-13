// dummy messages data for render in single chat
import { Message_Type } from "../Types/chats_types"

type oneDummy = {
    period: string
    messages: Message_Type[]
}
export type DummyMessage_Type = oneDummy[]

const user1= 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=100'
const user2= 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100'
const user3= 'https://images.unsplash.com/profile-1530556550255-d9a7e792ce37?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128'
const user4= 'https://media.istockphoto.com/id/939108006/photo/portrait-of-cute-girl.jpg?s=170x170&k=20&c=ZcdTyDp6Jz2a25WsWbF573RspFYeKpNIvDewTdfGodY='
const user5= 'https://www.gravatar.com/avatar/4b0d41741f2ffec347794d31f02daa56?d=mp&s=100'
const LOREM = 'lorem-ipsum is a JavaScript module for generating passages of lorem ipsum text. Lorem ipsum text is commonly used as placeholder text in publishing, graphic design, and web development.'
const LOREM_1 = 'lorem-ipsum is compatible with the browser, Node.JS, and React Native.'

export const dummyMessages: DummyMessage_Type = [
    {
        period: 'Today',
        messages: [
            {
                text: LOREM,
                sender: 'Sara Johns',
                sender_id: '1',
                avatar_url: user5,
                time_stamp: Date.now(),
                reviewed: false
            },
            {
                text: LOREM_1,
                sender: 'John Doe',
                sender_id: '2',
                avatar_url: user4,
                time_stamp: Date.now(),
                reviewed: false
            },
            {
                text: LOREM,
                sender: 'Jesica Parker',
                sender_id: '3',
                avatar_url: user3,
                time_stamp: Date.now(),
                reviewed: false
            },
            {
                text: LOREM_1,
                sender: 'Whiel Kabb',
                sender_id: '4',
                avatar_url: user2,
                time_stamp: Date.now(),
                reviewed: false
            },

        ]
    },
    {
        period: 'Today',
        messages: [
            {
                text: LOREM,
                sender: 'Sara Johns',
                sender_id: '1',
                avatar_url: user5,
                time_stamp: Date.now(),
                reviewed: false
            },
            {
                text: LOREM_1,
                sender: 'John Doe',
                sender_id: '2',
                avatar_url: user4,
                time_stamp: Date.now(),
                reviewed: false
            },
            {
                text: LOREM,
                sender: 'Jesica Parker',
                sender_id: '3',
                avatar_url: user3,
                time_stamp: Date.now(),
                reviewed: false
            },
            {
                text: LOREM_1,
                sender: 'Whiel Kabb',
                sender_id: '4',
                avatar_url: user2,
                time_stamp: Date.now(),
                reviewed: false
            },

        ]
    },
    {
        period: 'Today',
        messages: [
            {
                text: LOREM,
                sender: 'Sara Johns',
                sender_id: '1',
                avatar_url: user5,
                time_stamp: Date.now(),
                reviewed: false
            },
            {
                text: LOREM_1,
                sender: 'John Doe',
                sender_id: '2',
                avatar_url: user4,
                time_stamp: Date.now(),
                reviewed: false
            },
            {
                text: LOREM,
                sender: 'Jesica Parker',
                sender_id: '3',
                avatar_url: user3,
                time_stamp: Date.now(),
                reviewed: false
            },
            {
                text: LOREM_1,
                sender: 'Whiel Kabb',
                sender_id: '4',
                avatar_url: user2,
                time_stamp: Date.now(),
                reviewed: false
            },

        ]
    },

    

]
// ===
interface IMessage {
    text: string
    room: string
    author: string
    sender_id: string
    avatar_url: string | null
    time_stamp: number
    reviewed: boolean
    file: string | null
}

