
export type currentUserType = {
    displayName: string | null
    email: string 
    uid: string 
    photoURL: string | null
}
export type GenderType = 'male' | 'female' | 'not defined';

export type additionalUserDataType = {
    gender: GenderType
    dateOfBirth: string | 'not defined'
    phoneNumber: string | 'not defined'
}

export type UserType = {
    // data from Auth
    displayName: string | null
    email: string 
    uid: string 
    photoURL: string | null
    // data from Firestore DB
    phoneNumber: string | 'not defined'
    gender: 'male' | 'female' | 'not defined'
    dateOfBirth: string | 'not defined'
}
