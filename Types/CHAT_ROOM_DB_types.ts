export type chatRoomMetadataType = {
    startAt: number
    users: [string, string]
}

export type messageType = {
    text: string
    senderID: string
    createdAt: Date
    reviewed: boolean
    files: string[]
}

export type ChatRoomType = {
    metadata: chatRoomMetadataType
    messages: messageType[]
}