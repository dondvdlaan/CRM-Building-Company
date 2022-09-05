

export interface Project{
    projID: string;
    projTitle: string;
    projDesc: string;
    projType: string;
    projLand: boolean;
    projSurface: number;
    projStart: string;
    projNote: string;
    projStreet: string;
    projHouseNumber: string;
    projZipCode: string;
    projCity: string;
    projCountry: string;
    custID: string
    }



export interface ProjectWCustomer{
    projID: string;
    projTitle: string;
    projDesc: string;
    projType: string;
    projLand: boolean;
    projSurface: number;
    projStart: string;
    projNote: string;
    projStreet: string;
    projHouseNumber: string;
    projZipCode: string;
    projCity: string;
    projCountry: string;
    custID: string;
    custFirstName: string;
    custLastName: string;
    custTel: string;
    custEmail: string;
}
export interface RawProjectWCustomer{
    projID: string;
    projTitle: string;
    projDesc: string;
    projType: string;
    projLand: boolean;
    projSurface: number;
    projStart: string;
    projNote: string;
    projStreet: string;
    projHouseNumber: string;
    projZipCode: string;
    projCity: string;
    projCountry: string;
    customer:{
        custID: string;
        custFirstName: string;
        custLastName: string;
        custTel: string;
        custEmail: string;
        custRegistrationDate: string;
    }
}