import { Address } from "./Auxiliar";

export interface Customer extends CustomerWORegDate{
    custRegistrationDate: string
}

export interface CustomerWORegDate{
    custID: string;
    custFirstName: string;
    custLastName: string;
    custTel: string;
    custEmail: string;
    custStreet: string;
    custHouseNumber: string;
    custZipCode: string;
    custCity: string;
    custCountry: string;
    custAddress: Address;
}