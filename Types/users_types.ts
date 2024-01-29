// type for USER from firebase auth
// export type authedUserType = {
//     displayName: string | null
//     email: string
//     emailVerified: boolean
//     isAnonymous: boolean
//     metadata: { 
//         creationTime: number 
//         lastSignInTime:number
//     }
//     multiFactor?: {
//         enrolledFactors: []
//     }
//     phoneNumber: string | null
//     photoURL: string | null
//     providerData: Array<Object>
//     providerId: string
//     tenantId: string | null
//     uid: string
// };
// TODO: remove this code in future
// export type UserType = {
//     displayName: string 
//     email: string 
//     uid: string 
//     photoURL: string 
//     phoneNumber: string 
// }

// export type currentUserType = {
//     displayName: string | null
//     email: string 
//     uid: string 
//     photoURL: string | null
//     phoneNumber: string | null
// }
// export type personalUserDataType = {
//     gender: 'male' | 'female' | 'not defined'
//     dateOfBirth: string | 'not defined'
// }

export type UserType = {
    displayName: string | null
    email: string 
    uid: string 
    photoURL: string | null
    phoneNumber: string | null
    gender: 'male' | 'female' | 'not defined'
    dateOfBirth: string | 'not defined'
}
