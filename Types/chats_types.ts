// one message object type
export type Message_Type = {
    text: string
    sender: string
    sender_id: string
    avatar_url: string
    time_stamp: number
    reviewed: boolean
}

// chats list data type
export type DummyChatsList = {
    room: string
    pathToImage: string
    contactName: string
    shortMessage: string
    timeStamp: string
    messageCount: number
};
// === one message type structure ===
export interface IMessage {
    text: string
    room: string
    author: string
    sender_id: string
    avatar_url: string | null
    time_stamp: Date
    reviewed: boolean
    file: string | null
}

