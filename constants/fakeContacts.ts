// fake data for Contacts screen
import { IContact } from "../Types/main_types"

const DonnaAvatar= 'https://media.istockphoto.com/id/939108006/photo/portrait-of-cute-girl.jpg?s=170x170&k=20&c=ZcdTyDp6Jz2a25WsWbF573RspFYeKpNIvDewTdfGodY='
const PedroAvatar= 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=100'

const DonnaUUID = 'sC37PqofnENspHMqYuTihRUIzsI3'
const PedroUUID = 'pn5ycXu7L7WQAmplMlPHxOopSsh1'

const DonnaEmail = 'donna@gmail.com'
const PedroEmail = 'pedro@gmail.com'

const DonnaPhone = '+38 (096) 345-45-45'
const PedroPhone = '+38 (066) 105-66-14'


export const FakeContactData: IContact[] = [
    {
        contact_name: 'Pedro',
        contact_email: PedroEmail,
        phone_number: PedroPhone,
        contact_UID: PedroUUID,
        photo_URL: PedroAvatar
    },
    {
        contact_name: 'Donna',
        contact_email: DonnaEmail,
        phone_number: DonnaPhone,
        contact_UID: DonnaUUID,
        photo_URL: DonnaAvatar
    },

]