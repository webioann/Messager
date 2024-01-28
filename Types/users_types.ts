// type for USER from firebase auth
export type CurrentUser_Type = {
    displayName: string | null
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    metadata: { 
        creationTime: number 
        lastSignInTime:number
    }
    multiFactor?: {
        enrolledFactors: []
    }
    phoneNumber: string | null
    photoURL: string | null
    providerData: Array<Object>
    providerId: string
    tenantId: string | null
    uid: string
};

export type UserType = {
    displayName: string 
    email: string 
    uid: string 
    photoURL: string 
    phoneNumber: string 
}

export type currentUserType = {
    displayName: string | null
    email: string | null 
    uid: string 
    photoURL: string | null
    phoneNumber: string | null
}
// TODO: you must use this in the future
export type currentUserDataType = {
    displayName: string | null
    email: string | null 
    uid: string 
    photoURL: string | null
    phoneNumber: string | '+38(0XX) XXX XX XX'
    gender: 'male' | 'female' | 'not defined'
    dateOfBirth: string | '00/00/0000'
}
