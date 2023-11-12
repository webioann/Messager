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
export type ChatData_Type = {
    chatId: string
    pathToImage: string
    contactName: string
    shortMessage: string
    timeStamp: string
    messageCount: number
};

