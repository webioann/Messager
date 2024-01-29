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
// TODO: remove this code in future
export type UserType = {
    displayName: string 
    email: string 
    uid: string 
    photoURL: string 
    phoneNumber: string 
}
// TODO: remove this code in future
// export type currentUserType = {
//     displayName: string | null
//     email: string | null 
//     uid: string 
//     photoURL: string | null
//     phoneNumber: string | null
// }

type genderTypes = 'male' | 'female' | 'not defined';

export type currentUserDataType = {
    displayName: string | null
    email: string | null 
    uid: string 
    photoURL: string | null
    phoneNumber: string | null
    gender: genderTypes
    dateOfBirth: string | 'not defined'
}
