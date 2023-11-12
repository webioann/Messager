import { ChatData_Type } from "../Types/chats_types";

type ChatsData = Array<ChatData_Type>

const user1= 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=100'
const user2= 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=100'
const user3= 'https://images.unsplash.com/profile-1530556550255-d9a7e792ce37?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128'
const user4= 'https://media.istockphoto.com/id/939108006/photo/portrait-of-cute-girl.jpg?s=170x170&k=20&c=ZcdTyDp6Jz2a25WsWbF573RspFYeKpNIvDewTdfGodY='
const user5= 'https://www.gravatar.com/avatar/4b0d41741f2ffec347794d31f02daa56?d=mp&s=100'
const user6= 'https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9kYzFmNTRlNTZiMzUzOWRkNmMzNTkzZjljMTYyYjFkZj9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.v1-RhDn1K9nsDAnPkBf1uI87klBgfmErjYfh7aXJzy4'


export const DUMMY_CHATS: ChatsData = [
    {
        chatId: '1',
        pathToImage: user6,
        contactName: 'Sara Sanders',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 0
    },
    {
        chatId: '2',
        pathToImage: user2,
        contactName: 'John Doe',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 0
    },
    {
        chatId: '3',
        pathToImage: user3,
        contactName: 'Lusy Lee',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 10
    },
    {
        chatId: '4',
        pathToImage: user4,
        contactName: 'Rabeca Smith',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 5
    },
    {
        chatId: '5',
        pathToImage: user2,
        contactName: 'Dru Berrymore',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 1
    },
    {
        chatId: '6',
        pathToImage: user5,
        contactName: 'Tom Crueze',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 0
    },
    {
        chatId: '7',
        pathToImage: user3,
        contactName: 'Genjy Root',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 0
    },
    {
        chatId: '8',
        pathToImage: user1,
        contactName: 'Camy Dupont',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 0
    },
    {
        chatId: '9',
        pathToImage: user2,
        contactName: 'Greg Loop',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 0
    },
    {
        chatId: '10',
        pathToImage: user5,
        contactName: 'Kira Nightly',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 0
    },
    {
        chatId: '11',
        pathToImage: user4,
        contactName: 'Tobi McGwire',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 100
    },
    {
        chatId: '12',
        pathToImage: user3,
        contactName: 'Sara J Parker',
        shortMessage: 'Can you buy me dinner?',
        timeStamp: '12:35',
        messageCount: 0
    },

];