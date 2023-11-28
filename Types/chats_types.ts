export type metadataType = {
    startAt: number
    users: [string, string]
}

export type messageType = {
    text: string
    senderID: string
    createdAt: number
    reviewed: boolean
    files: string[]
}

export type ChatRoomType = {
    metadata: metadataType
    messages: messageType[]
}