import {ICity} from "@/features/common/city"

export interface IProfile {
    firstname: string,
    lastname: string,
    middle_name: string,
    birthdate: string,
    iin: string,
    image_url: string,
    phone_number: string,
    email: string,
    image: boolean,
    city: ICity,
    address: string,
    is_active: string,
    is_staff: string,
    is_superuser: string,
    created_at: string,
    updated_at: string,
}
