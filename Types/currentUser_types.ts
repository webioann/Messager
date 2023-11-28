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

export interface IUser {
    displayName: string 
    email: string 
    uid: string 
    photoURL: string 
    phoneNumber: string 
}

